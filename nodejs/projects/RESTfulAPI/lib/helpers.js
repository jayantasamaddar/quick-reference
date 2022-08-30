import { createHmac, randomBytes } from 'crypto';
import https from 'https';
import env from '../config.js';

// Container for all helpers
const helpers = {};

// Hash Password method
helpers.hashPassword = password => {
  if (typeof password !== 'string' || password.trim().length === 0) return;

  const hash = createHmac('sha256', env.hash_secret)
    .update(password)
    .digest('hex');
  return hash;
};

// Generate Token
helpers.generateToken = (length = 20) => {
  if (typeof length !== 'number' || length <= 8) length = 20;
  return randomBytes(length).toString('hex');
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJSONToObject = str => {
  try {
    return JSON.parse(str);
  } catch (err) {
    console.log({});
  }
};

// Send SMS via Twilio
helpers.sendTwilioSMS = (phone, message, callback) => {
  // Validate parameters
  phone =
    typeof phone === 'string' && phone.trim().length === 10
      ? phone.trim()
      : false;
  message =
    typeof message === 'string' &&
    message.trim().length > 0 &&
    message.length <= 1600
      ? message
      : false;

  if (phone && message) {
    // Configure the request payload
    // "api.twilio.com as a POST at account/messages endpoint with certain headers"
    const payload = {
      From: env.twilio.fromPhone,
      To: '+91' + phone,
      Body: message,
    };

    // Stringify the payload
    const payloadParams = new URLSearchParams(payload);
    const payloadStr = payloadParams.toString();

    // Configure the request
    const requestDetails = {
      protocol: 'https:',
      hostname: 'api.twilio.com',
      method: 'POST',
      path: '/2010-04-01/Accounts/' + env.twilio.accountSid + '/Messages',
      auth: env.twilio.accountSid + ':' + env.twilio.authToken,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(payloadStr),
      },
    };

    // Instantiate the request object
    const req = https.request(requestDetails, res => {
      // Grab the status of the sent request
      if ([200, 201].includes(res.statusCode)) {
        // Callback successfully
        callback(false);
      } else callback(`Status Code: ${res.statusCode}`);
    });

    // Bind to the error event so it doesn't get thrown
    req.on('error', e => {
      callback(e);
    });

    // Add the payload
    req.write(payloadStr);

    // End the request and send it.
    req.end();
  } else callback(400, { error: 'Missing or invalid parameters!' });
};

// ANSI colours
helpers.color = {
  info: '\x1b[34m%s\x1b[0m',
  success: '\x1b[32m%s\x1b[0m',
  warning: '\x1b[33m%s\x1b[0m',
  error: '\x1b[31m%s\x1b[0m',
};

export default helpers;
