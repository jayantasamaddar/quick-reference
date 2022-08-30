import { default as _data } from './data.js';
import helpers from './helpers.js';
import env from '../config.js';

// Define Handlers
const handlers = {};

// ping handler
handlers.ping = (data, callback) => {
  callback(200);
};

// Not found Handler
handlers.notFound = (data, callback) => {
  callback(404);
};

/** handlers.users */

handlers.users = (data, callback) => {
  const method = data.method.toLowerCase();
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.includes(method)) {
    handlers._users[method](data, callback);
  } else callback(405, 'Invalid Method');
};

// Container for the users sub-methods
handlers._users = {};

/**
 * users - post
 * ------------
 *
 * Required: phone, first_name, last_name, password, tos
 * Optional: none
 *
 * @param {object} data
 * @param {function} callback
 */
handlers._users.post = (data, callback) => {
  // Sanity Check: Check all required fields are present
  const first_name =
    typeof data.payload?.first_name === 'string' &&
    data.payload.first_name.trim().length > 0
      ? data.payload.first_name
      : false;
  const last_name =
    typeof data.payload?.last_name === 'string' &&
    data.payload.last_name.trim().length > 0
      ? data.payload.last_name
      : false;
  const phone =
    typeof data.payload?.phone === 'string' &&
    data.payload.phone.trim().length === 10
      ? data.payload.phone
      : false;
  const password =
    typeof data.payload?.password === 'string' &&
    data.payload.password.trim().length > 0
      ? data.payload.password
      : false;
  const tos =
    typeof data.payload?.tos === 'boolean' && data.payload.tos === true;

  if (first_name && last_name && phone && password && tos) {
    // Make sure that the user doesn't already exist: Unique phone number
    _data.read('users', phone, (err, data) => {
      if (err) {
        // (1) Hash the password
        const hashedPassword = helpers.hashPassword(password);

        // (2) Create the user object
        const user = {
          first_name,
          last_name,
          phone,
          password: hashedPassword,
          tos,
        };

        if (hashedPassword) {
          // (3) Store the user object to file (in production: write to database)
          _data.create('users', phone, user, err => {
            if (!err) {
              // Remove the password from the user data object
              delete user.password;
              callback(201, { data: user, message: 'User was created!' });
            } else {
              console.log(err.message);
              callback(400, { error: 'User could not be created!' });
            }
          });
        } else callback(500, { error: 'Password could not be hashed!' });
      } else {
        // User already exists
        callback(400, { error: 'User with phone number already exists!' });
      }
    });
  } else callback(400, { error: 'Missing required field(s)!' });
};

/**
 * users - get
 * ------------
 *
 * Allow token authenticated users to access their data
 *
 * Required: phone
 * Optional: none
 *
 * @param {object} data
 * @param {function} callback
 */
handlers._users.get = (data, callback) => {
  const phone =
    typeof data?.queryParams?.phone === 'string' &&
    data.queryParams.phone.length === 10
      ? data.queryParams.phone
      : false;

  if (phone) {
    // Get the token from the headers
    const token =
      typeof data.headers?.token === 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the user
    handlers._tokens.verify(token, phone, isValid => {
      if (isValid) {
        // Lookup the user
        _data.read('users', phone, (err, data) => {
          if (!err && data) {
            // Remove the password from the user data object
            delete data.password;
            callback(200, data);
          } else callback(404, { error: 'Invalid UserID' });
        });
      } else callback(403, { error: 'Missing or invalid token in header.' });
    });
  } else {
    callback(400, { error: 'Invalid UserID format' });
  }
};

/**
 * users - put
 * ------------
 *
 * Allow token authenticated users to update their data
 *
 * Required: phone
 * Optional: first_name, last_name, password
 *
 * @param {object} data
 * @param {function} callback
 */
handlers._users.put = (data, callback) => {
  const phone =
    typeof data?.payload?.phone === 'string' &&
    data.payload.phone.trim().length === 10
      ? data.payload.phone.trim()
      : false;

  if (parseInt(phone)?.toString().length === phone.length) {
    // Get the token from the headers
    const token =
      typeof data.headers?.token === 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the user
    handlers._tokens.verify(token, phone, isValid => {
      if (isValid) {
        // Parse payload received
        const first_name =
          typeof data.payload?.first_name === 'string' &&
          data.payload.first_name.trim().length > 0
            ? data.payload.first_name
            : false;
        const last_name =
          typeof data.payload?.last_name === 'string' &&
          data.payload.last_name.trim().length > 0
            ? data.payload.last_name
            : false;
        const password =
          typeof data.payload?.password === 'string' &&
          data.payload.password.trim().length > 0
            ? data.payload.password
            : false;

        // Sanity check
        if (first_name || last_name || password) {
          // read if data exists
          _data.read('users', phone, (err, userData) => {
            if (!err && userData) {
              // update the necessary fields
              userData.first_name = first_name || userData.first_name;
              userData.last_name = last_name || userData.last_name;
              userData.password = password
                ? helpers.hashPassword(password)
                : userData.password;

              // update the user by passing updated data
              _data.update('users', phone, userData, err => {
                if (!err) {
                  // Remove the password from the user data object
                  delete userData.password;
                  callback(200, { data: userData, message: 'User is Updated' });
                } else callback(500, { error: 'Could not update user!' });
              });
            } else
              callback(404, {
                error: "User with phone number, doesn't exist!",
              });
          });
        } else callback(400, { error: 'No fields provided for update!' });
      } else callback(403, { error: 'Missing or invalid token in header.' });
    });
  } else {
    callback(400, { error: 'Invalid Phone Number (required field)' });
  }
};

/**
 * users - delete
 * ---------------
 *
 * Allow token authenticated users to delete their data. Deletes all tokens as well.
 *
 * Required: phone
 * Optional: none
 *
 * @param {object} data
 * @param {function} callback
 */
handlers._users.delete = (data, callback) => {
  const phone =
    typeof data?.queryParams?.phone === 'string' &&
    data.queryParams.phone.length === 10
      ? data.queryParams.phone
      : false;

  if (phone) {
    // Get the token from the headers
    const token =
      typeof data.headers?.token === 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the user
    handlers._tokens.verify(token, phone, isValid => {
      if (isValid) {
        _data.read('users', phone, (err, data) => {
          if (!err && data) {
            // Delete the file
            _data.delete('users', phone, err => {
              if (!err) {
                // Make an error object to collect errors made while deleting associated items
                const errors = {
                  checks: {
                    ids: [],
                    count: 0,
                  },
                  tokens: {
                    ids: [],
                    count: 0,
                  },
                  total: 0,
                };
                // (1) Delete the checks

                // Search and delete the checks belonging to user
                const userChecks = Array.isArray(data?.checks)
                  ? data.checks
                  : [];

                // Iterate over checks and delete one by one
                for (const check of userChecks) {
                  _data.delete('checks', check, err => {
                    if (err) {
                      errors.checks.ids.push(check);
                      errors.checks.count += 1;
                      errors.total += 1;
                    }
                  });
                }

                // (2) Delete the tokens

                // Search and find the tokens belonging to user
                _data.search('tokens', { phone }, (err, files) => {
                  if (!err && files.length > 0) {
                    // Delete the tokens one by one
                    for (const file of files) {
                      const tokenID = file.replace('.json', '');
                      _data.delete('tokens', tokenID, err => {
                        if (err) {
                          errors.tokens.ids.push(tokenID);
                          errors.tokens.count += 1;
                          errors.total += 1;
                        }
                      });
                    }
                  } else
                    console.log(`No tokens belonging to user ${phone} found`);
                });

                // Construct base success message
                const successMsg = {
                  message: `User ${phone} deleted.`,
                };

                // Handle if there are errors vs no errors
                if (errors.total > 0) {
                  successMsg.errors = errors;
                  callback(409, successMsg);
                } else callback(200, successMsg);
              } else callback(500, { error: 'Could not delete the user!' });
            });
          } else
            callback(400, { error: 'Could not find the user to be deleted!' });
        });
      } else callback(403, { error: 'Missing or invalid token in header.' });
    });
  } else {
    callback(400, { error: 'Invalid UserID format' });
  }
};

/*************************************************************************************************/
/** handlers.tokens */
/*************************************************************************************************/

handlers.tokens = (data, callback) => {
  const method = data.method.toLowerCase();
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.includes(method)) {
    handlers._tokens[method](data, callback);
  } else callback(405, 'Invalid Method');
};

// Container for the tokens sub-methods
handlers._tokens = {};

/**
 * tokens - post
 * -------------
 *
 * Required: phone, password
 * Optional: none
 *
 * @param {object} data
 * @param {function} callback
 */
handlers._tokens.post = (data, callback) => {
  const phone =
    typeof data.payload?.phone === 'string' &&
    data.payload.phone.trim().length === 10
      ? data.payload.phone
      : false;
  const password =
    typeof data.payload?.password === 'string' &&
    data.payload.password.trim().length > 0
      ? data.payload.password
      : false;

  if (phone && password) {
    // Lookup the user who matches the phone number
    _data.read('users', phone, (err, data) => {
      if (!err && data) {
        // Hash the sent password and compare it to the password stored in the user object.
        const hashedPassword = helpers.hashPassword(password);
        if (data.password === hashedPassword) {
          // If Valid, generate new token with a validity of 60 mins.
          const token = helpers.generateToken(20);
          const expires = Date.now() + 1000 * 60 * 60;
          const tokenObj = {
            phone,
            token,
            expires,
          };
          // Store the token
          _data.create('tokens', token, tokenObj, err => {
            if (!err) {
              callback(201, { data: tokenObj, message: 'Token created!' });
            } else callback(500, 'Failure to create token!');
          });
        } else callback(400, { error: 'Password did not match!' });
      } else callback(400, { error: 'Could not find user!' });
    });
  } else callback(400, { error: 'Missing required fields!' });
};

/**
 * tokens - get
 * ------------
 *
 * Allow authenticated users to access their token data
 *
 * Required: phone
 * Optional: none
 *
 * @param {object} data
 * @param {function} callback
 */
handlers._tokens.get = (data, callback) => {
  // Check that the id is valid
  const token =
    typeof data?.queryParams?.token === 'string' &&
    data.queryParams.token.length === 2 * 20
      ? data.queryParams.token
      : false;

  if (token) {
    // Lookup the token
    _data.read('tokens', token, (err, data) => {
      if (!err && data) {
        callback(200, data);
      } else callback(404, { error: 'Invalid Token' });
    });
  } else {
    callback(400, { error: 'Invalid Token format' });
  }
};

/**
 * tokens - put
 * ------------
 *
 * Allow authenticated users to refresh their token expiry if it still hasn't expired
 *
 * Required: token, extend
 * Optional: none
 *
 * @param {object} data
 * @param {function} callback
 */

handlers._tokens.put = (data, callback) => {
  // Check that the token is valid
  const token =
    typeof data?.payload?.token === 'string' &&
    data.payload.token.length === 2 * 20
      ? data.payload.token
      : false;

  const extend =
    typeof data?.payload?.extend === 'boolean' ? data.payload.extend : false;

  if (token && extend) {
    _data.read('tokens', token, (err, data) => {
      if (!err && data) {
        // Check if Token isn't already expired, then update data
        if (data.expires > Date.now()) {
          // extend expiry by an hour
          data.expires = Date.now() + 1000 * 60 * 60;

          // Update token
          _data.update('tokens', token, data, err => {
            if (!err) {
              callback(200, { data, message: 'Token expiry extended!' });
            } else callback(500, { error: 'Failure to extend token expiry!' });
          });
        } else callback(400, { error: 'Token has already expired!' });
      } else
        callback(400, { error: 'Invalid Token. Could not read Token data!' });
    });
  } else callback(400, { error: 'Required fields are missing!' });
};

/**
 * tokens - delete
 * ---------------
 *
 * Allow authenticated users to delete their tokens
 *
 * Required: token
 * Optional: none
 *
 * @param {object} data
 * @param {function} callback
 */
handlers._tokens.delete = (data, callback) => {
  // Check that the token format is valid
  const token =
    typeof data?.queryParams?.token === 'string' &&
    data.queryParams.token.length === 2 * 20
      ? data.queryParams.token
      : false;

  if (token) {
    _data.read('tokens', token, (err, data) => {
      if (!err && data) {
        // Delete the record
        _data.delete('tokens', token, err => {
          if (!err) {
            callback(200, { message: `Token ${token} deleted!` });
          } else callback(500, { error: 'Failure to delete token!' });
        });
      } else
        callback(400, { error: 'Invalid Token. Failure to read Token data!' });
    });
  } else callback(400, { error: 'Invalid token format!' });
};

// Verify if the given token is currently valid for a given user
handlers._tokens.verify = (token, phone, callback) => {
  // Lookup the Token
  _data.read('tokens', token, (err, data) => {
    if (!err && data) {
      // Check that the token is for the given user and has not expired
      if (data.expires > Date.now() && data.phone === phone) {
        callback(true);
      } else callback(false);
    } else callback(false);
  });
};

/*************************************************************************************************/
/** handlers.checks */
/*************************************************************************************************/

// Primary Handler - checks
handlers.checks = (data, callback) => {
  const method = data.method.toLowerCase();
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.includes(method)) {
    handlers._checks[method](data, callback);
  } else callback(405, 'Invalid Method');
};

// Container for all the checks methods
handlers._checks = {};

/**
 * checks - post
 * --------------
 *
 * Allows authenticated users to create checks
 *
 * Required data: protocol, url, method, successCodes, timeoutSeconds
 * Optional data: none
 * @param {object} data
 * @param {function} callback
 */
handlers._checks.post = (data, callback) => {
  // Validate inputs
  const protocol =
    typeof data.payload?.protocol === 'string' &&
    ['http', 'https'].includes(data.payload.protocol)
      ? data.payload.protocol
      : false;

  const url =
    typeof data.payload?.url === 'string' && data.payload.url.trim().length > 0
      ? data.payload.url
      : false;

  const method =
    typeof data.payload?.method === 'string' &&
    ['post', 'get', 'put', 'delete'].includes(data.payload.method)
      ? data.payload.method
      : false;

  const successCodes =
    Array.isArray(data.payload?.successCodes) &&
    data.payload.successCodes.length > 0
      ? data.payload.successCodes
      : false;

  const timeoutSeconds =
    typeof data.payload?.timeoutSeconds === 'number' &&
    data.payload.timeoutSeconds % 1 === 0 &&
    data.payload.timeoutSeconds >= 1 &&
    data.payload.timeoutSeconds <= 5
      ? data.payload.timeoutSeconds
      : false;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    // Validate Authenticated user
    const token =
      typeof data?.headers?.token === 'string' &&
      data.headers.token.length === 2 * 20
        ? data.headers.token
        : false;

    // Lookup the user by reading the token
    if (token) {
      _data.read('tokens', token, (err, tokenData) => {
        if (!err && tokenData) {
          const phone = tokenData.phone;

          // Lookup the user data
          _data.read('users', phone, (err, userData) => {
            if (!err && userData) {
              const userChecks = Array.isArray(userData?.checks)
                ? userData.checks
                : [];
              // Verify that the user has less than the number of maxChecks allowed per user
              if (userChecks.length < env.maxChecks) {
                // Create a randomID for check
                const checkID = helpers.generateToken();

                // Create the check object and include the user's phone
                const checkObj = {
                  id: checkID,
                  phone,
                  protocol,
                  url,
                  method,
                  successCodes,
                  timeoutSeconds,
                };

                // Save the check object to disk
                _data.create('checks', checkID, checkObj, err => {
                  if (!err) {
                    // Add the checkID to user's object
                    userData.checks = userChecks.concat(checkID);

                    // Save the new user Data
                    _data.update('users', phone, userData, err => {
                      if (!err) {
                        // Return the data about the new check
                        callback(200, checkObj);
                      } else
                        callback(500, 'Could not update user with checks!');
                    });
                  } else callback(500, 'Could not create a new check!');
                });
              } else
                callback(400, {
                  error: `User has reached maxChecks (${env.maxChecks})`,
                });
            } else callback(404, { error: 'Could not find user!' });
          });
        } else callback(403, { error: 'User is not authorized!' });
      });
    } else callback(400, { error: 'Invalid token format' });
  } else callback(400, { error: 'Missing/Invalid required inputs!' });
};

/**
 * checks - get
 * ------------
 *
 * Allows authenticated users to return check data
 *
 * Required data: checkID
 * Optional data: none
 * @param {object} data
 * @param {function} callback
 */

handlers._checks.get = (data, callback) => {
  // Check that the id is valid
  const id =
    typeof data?.queryParams?.id === 'string' &&
    data.queryParams.id.length === 2 * 20
      ? data.queryParams.id
      : false;

  if (id) {
    // Lookup the check
    _data.read('checks', id, (err, checkData) => {
      if (!err && checkData) {
        // Get the token from the headers
        const token =
          typeof data?.headers?.token === 'string' &&
          data.headers.token.length === 2 * 20
            ? data.headers.token
            : false;

        // Verify that the given token is valid for the user
        handlers._tokens.verify(token, checkData.phone, isValid => {
          if (isValid) {
            // Return the check data
            callback(200, checkData);
          } else
            callback(403, { error: 'Missing or invalid token in header.' });
        });
      } else callback(404, { error: 'Check could not be found!' });
    });
  } else {
    callback(400, { error: 'Invalid token format/missing token' });
  }
};

/**
 * checks - put
 * ------------
 *
 * Allows authenticated users to modify check data
 *
 * Required data: id
 * Optional data: protocol, url, method, successCodes, timeoutSeconds
 * @param {object} data
 * @param {function} callback
 */

handlers._checks.put = (data, callback) => {
  // Check for required field
  const id =
    typeof data?.payload?.id === 'string' && data.payload.id.length === 2 * 20
      ? data.payload.id
      : false;

  if (id) {
    // Validate optional fields
    const protocol =
      typeof data.payload?.protocol === 'string' &&
      ['http', 'https'].includes(data.payload.protocol)
        ? data.payload.protocol
        : false;

    const url =
      typeof data.payload?.url === 'string' &&
      data.payload.url.trim().length > 0
        ? data.payload.url
        : false;

    const method =
      typeof data.payload?.method === 'string' &&
      ['post', 'get', 'put', 'delete'].includes(data.payload.method)
        ? data.payload.method
        : false;

    const successCodes =
      Array.isArray(data.payload?.successCodes) &&
      data.payload.successCodes.length > 0
        ? data.payload.successCodes
        : false;

    const timeoutSeconds =
      typeof data.payload?.timeoutSeconds === 'number' &&
      data.payload.timeoutSeconds % 1 === 0 &&
      data.payload.timeoutSeconds >= 1 &&
      data.payload.timeoutSeconds <= 5
        ? data.payload.timeoutSeconds
        : false;

    if (protocol || url || method || successCodes || timeoutSeconds) {
      _data.read('checks', id, (err, checkData) => {
        if (!err && checkData) {
          // Validate Authenticated user
          const token =
            typeof data?.headers?.token === 'string' &&
            data.headers.token.length === 2 * 20
              ? data.headers.token
              : false;

          if (token) {
            handlers._tokens.verify(token, checkData.phone, isValid => {
              if (isValid) {
                // update the necessary fields
                checkData.protocol = protocol || checkData.protocol;
                checkData.url = url || checkData.url;
                checkData.method = method || checkData.method;
                checkData.successCodes = successCodes || checkData.successCodes;
                checkData.timeoutSeconds =
                  timeoutSeconds || checkData.timeoutSeconds;

                // update the check file
                _data.update('checks', id, checkData, err => {
                  if (!err) {
                    callback(200, {
                      data: checkData,
                      message: 'Check updated!',
                    });
                  } else callback(500, { error: 'Could not update check!' });
                });
              } else
                callback(403, { error: 'Missing or invalid token in header.' });
            });
          } else callback(403, { error: 'Invalid Token format' });
        } else callback(404, { error: 'Check could not be found!' });
      });
    } else callback(400, { error: 'Missing fields to update' });
  } else callback(400, { error: 'Invalid id format' });
};

/**
 * checks - delete
 * ---------------
 *
 * Allows authenticated users to delete checks
 *
 * Required data: id
 * Optional data: none
 * @param {object} data
 * @param {function} callback
 */

handlers._checks.delete = (data, callback) => {
  // Get and validate id from query parameters
  const id =
    typeof data?.queryParams?.id === 'string' &&
    data.queryParams.id.length === 2 * 20
      ? data.queryParams.id
      : false;

  if (id) {
    _data.read('checks', id, (err, checkData) => {
      if (!err && checkData) {
        // Get the token from the headers
        const token =
          typeof data?.headers?.token === 'string' &&
          data.headers.token.length === 2 * 20
            ? data.headers.token
            : false;

        // Authenticate token
        if (token) {
          // Verify that the given token is valid for the user
          handlers._tokens.verify(token, checkData.phone, isValid => {
            if (isValid) {
              // Delete the check file
              _data.delete('checks', id, err => {
                if (!err) {
                  // Remove from checks array in users
                  _data.read('users', checkData.phone, (err, userData) => {
                    if (!err && userData) {
                      const checkIndex = Array.isArray(userData?.checks)
                        ? userData.checks.indexOf(id)
                        : -1;
                      if (checkIndex >= 0) {
                        userData.checks.splice(checkIndex, 1);
                        _data.update('users', userData.phone, userData, err => {
                          if (!err) {
                            // Success in deleting check and modifying user
                            callback(200, {
                              message: `Check ${id} deleted. User ${userData.phone}'s checks modified.`,
                            });
                          } else {
                            // Success in deleting check but failed to modify user
                            callback(
                              409,
                              `Check ${id} deleted but failed to modify user ${userData.phone}`
                            );
                          }
                        });
                      } else {
                        // Success in deleting check but user needed no modification
                        callback(200, {
                          message: `Check ${id} deleted. User needed no modification.`,
                        });
                      }
                    } else {
                      // Success in deleting check but user could not be found.
                      callback(200, {
                        message: `Check ${id} deleted. User could not be found.`,
                      });
                    }
                  });
                } else callback(500, { error: 'Could not delete the check!' });
              });
            } else
              callback(403, { error: 'Missing or invalid token in header.' });
          });
        } else callback(403, { error: 'Invalid token format!' });
      } else callback(404, { error: 'Check could not be found!' });
    });
  } else {
    callback(400, { error: 'Invalid id format' });
  }
};

export default handlers;
