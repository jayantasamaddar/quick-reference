/**
 * Worker related tasks
 */

/** Dependencies */
import path from 'path';
import url from 'url';
import fs from 'fs';
import http from 'http';
import https from 'https';
import { default as _data } from './data.js';
import helpers from './helpers.js';
import env from '../config.js';
import { default as _logs } from './logs.js';
import util from 'util';

// Solve for __dirname not defined in ES module scope. Not needed for CommonJS
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize debuglog
const debug = util.debuglog('workers');

// Instantiate the worker object
const workers = {};

// Lookup all checks, get their data and send to a validator
workers.getAllChecks = () => {
  // Get all the checks in the system
  _data.search('checks', {}, (err, checks) => {
    if (!err && checks.length > 0) {
      for (const check of checks) {
        const checkID = check.replace('.json', '');
        // Read in the check data
        _data.read('checks', checkID, (err, data) => {
          if (!err && data) {
            // Pass data to check validator function
            workers.validateChecks(data);
          } else debug('Error: Reading check data');
        });
      }
    } else debug('Error: Could not find any checks to process!');
  });
};

/** Validator function: Sanity checking the check data */
workers.validateChecks = data => {
  data = typeof data === 'object' ? data : {};

  data.id =
    typeof data?.id === 'string' && data.id.trim().length === 2 * 20
      ? data.id.trim()
      : false;

  data.phone =
    typeof data?.phone === 'string' && data.phone.trim().length === 10
      ? data.phone.trim()
      : false;

  data.protocol =
    typeof data?.protocol === 'string' &&
    ['https', 'http'].includes(data.protocol)
      ? data.protocol
      : false;

  data.url =
    typeof data?.url === 'string' && data.url.trim().length > 0
      ? data.url.trim()
      : false;

  data.method =
    typeof data.method === 'string' &&
    ['post', 'get', 'put', 'delete'].includes(data.method)
      ? data.method
      : false;

  data.successCodes =
    Array.isArray(data?.successCodes) && data.successCodes.length > 0
      ? data.successCodes
      : false;

  data.timeoutSeconds =
    typeof data?.timeoutSeconds === 'number' &&
    data.timeoutSeconds % 1 === 0 &&
    data.timeoutSeconds >= 1 &&
    data.timeoutSeconds <= 5
      ? data.timeoutSeconds
      : false;

  // Set the keys that may not be set (if the workers have never seen this check before)
  // state, lastChecked

  data.state =
    typeof data?.state === 'string' && ['up', 'down'].includes(data.state)
      ? data.state
      : 'down';

  data.lastChecked =
    typeof data?.lastChecked === 'number' && data.lastChecked > 0
      ? data.lastChecked
      : false;

  // If all checks pass, pass the data along to the next step of the process
  if (
    data.id &&
    data.phone &&
    data.protocol &&
    data.method &&
    data.url &&
    data.successCodes &&
    data.timeoutSeconds
  ) {
    workers.performCheck(data);
  } else {
    debug('Error: Sanity check while running workers failed.');
  }
};

/** Perform the check. Send the original check data and forward the outcome of the check process */
workers.performCheck = data => {
  // Prepare the initial check outcome
  const checkOutcome = {
    error: false,
    responseCode: false,
  };

  // Mark that the outcome hasn't been sent yet
  let outcomeSent = false;

  // Parse the hostname and path out of the original data
  const parsedUrl = url.parse(`${data.protocol}://${data.url}`, true);
  const hostname = parsedUrl.hostname;
  const path = parsedUrl.path; // Using path and not 'pathname' because we want the query string

  // Construct the request
  const requestDetails = {
    protocol: data.protocol + ':',
    hostname,
    method: data.method.toUpperCase(),
    path,
    timeout: data.timeoutSeconds * 1000, // Converting to miliseconds
  };

  // Get the protocol
  const _protocol = data.protocol === 'http' ? http : https;

  // Instantiate the request object (using either the 'http' or 'https' module)
  const req = _protocol.request(requestDetails, res => {
    // Update the checkOutcome object and pass the data along
    checkOutcome.responseCode = res.statusCode;

    if (!outcomeSent) {
      workers.processCheckOutcome(data, checkOutcome);
      outcomeSent = true;
    }
  });

  // Bind to the error so it doesn't get thrown
  req.on('error', e => {
    // Update the checkOutcome and pass the data along
    checkOutcome.error = { error: true, value: e };

    if (!outcomeSent) {
      workers.processCheckOutcome(data, checkOutcome);
      outcomeSent = true;
    }
  });

  // Bind to the timeout event
  req.on('timeout', e => {
    // Update the checkOutcome and pass the data along
    checkOutcome.error = { error: true, value: 'timeout' };

    if (!outcomeSent) {
      workers.processCheckOutcome(data, checkOutcome);
      outcomeSent = true;
    }
  });

  // End the request / Send the request
  req.end();
};

/**
 * Process the checkOutcome, update the check data as needed and trigger an alert to the user
 *
 * Special logic for accomodating a check that has never been tested before (don't alert)
 *
 */
workers.processCheckOutcome = (data, checkOutcome) => {
  // Decide if the check is 'up' or 'down'
  const state =
    !checkOutcome.error &&
    checkOutcome.responseCode &&
    data.successCodes.includes(checkOutcome.responseCode)
      ? 'up'
      : 'down';

  // Decide if an alert is required. Only if state is modified send alerts otherwise don't
  const alertReqd = !data.lastChecked && data.state !== state;

  // Log the outcome
  const timeOfCheck = Date.now();
  workers.log({
    check: data,
    outcome: checkOutcome,
    state,
    alert: alertReqd,
    time: timeOfCheck,
  });

  // Update the check data
  const newData = {
    ...data,
    state,
    lastChecked: timeOfCheck,
  };

  // Save the data
  _data.update('checks', newData.id, newData, err => {
    if (!err) {
      // Send the newData to the next phase in the process if needed
      if (alertReqd) {
        // Send alert
        workers.alertUser(newData);
      } else debug(`The status has not changed for check ${newData.id}.`);
    } else
      debug(
        `Error: Trying to save updates while running checks on check ${newData.id}!`
      );
  });
};

/** Alert User to a change in check status */
workers.alertUser = data => {
  // Craft message
  const message = `Alert: Your check for ${data.method.toUpperCase()} ${
    data.protocol
  }://${data.url} 
    is currently ${data.state.toUpperCase()}`;

  // Send message
  helpers.sendTwilioSMS(data.phone, message, err => {
    if (!err) {
      debug(`User was alerted via SMS to a status change in check ${data.id}!`);
    } else
      debug(
        `Error: Failure to send SMS to user: ${data.phone} for a status change in check ${data.id}!`
      );
  });
};

// Log
workers.log = data => {
  // Determine the name of the log file
  const logFileName = data.check.id;

  // Append the log string to the file
  _logs.append(logFileName, data, err => {
    if (!err) {
      debug('Success: Logged to file successfully!.');
    } else debug('Error: Logging to file failed.');
  });
};

// Timer to execute the worker process, once per minute
workers.loop = () => {
  setInterval(() => {
    workers.getAllChecks();
  }, 1000 * env.workers.checkInterval);
};

// Rotate (compress) the log files
workers.rotateLogs = () => {
  // List all the non-compressed Log files on the .logs folder
  _logs.list(false, (err, logs) => {
    if (!err && logs.length) {
      for (const log of logs) {
        // Compress and store the data to a different file
        const logId = log.replace('.log', '');
        const newFileId = `${logId}-${Date.now()}`;
        _logs.compress(logId, newFileId, err => {
          if (!err) {
            // Truncate the log
            _logs.truncate(logId, err => {
              if (!err) {
                debug('Success: Truncating log file.');
              } else debug('Error: Truncating log file.');
            });
          } else debug(`Error: Compression failed for log file ${logId}`, err);
        });
      }
    } else debug("Message: Couldn't find any logs to rotate!");
  });
};

// Timer to execute the log rotation process, once per day
workers.rotationLoop = () => {
  setInterval(() => {
    workers.rotateLogs();
  }, 1000 * env.workers.rotationInterval);
};

// Create the Initialization method
workers.init = () => {
  // Send to console in yellow
  console.log('\x1b[33m%s\x1b[0m', 'Background workers are running!');

  // Execute all the checks
  workers.getAllChecks();

  // Call a loop to keep executing the checks periodically
  workers.loop();

  // Compress all the logs immediately
  workers.rotateLogs();

  // Call the compression loop so logs will be compressed later on
  workers.rotationLoop();
};

// Export the workers object
export default workers;
