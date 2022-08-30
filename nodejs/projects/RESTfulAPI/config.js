// Container for all environments
const environments = {};

// Development Environment (Default)
environments.development = {
  httpPort: 3000,
  httpsPort: 3001,
  name: 'development',
  hash_secret: 'xMz3frYUwHONpJdhzfv2ygpvIPf8ZlatUYdzT5flUSw=',
  maxChecks: 5,
  twilio: {
    accountSid: 'ACb0f4dc09da5bb486393893c78c408d83',
    authToken: '4162317f940f75d1ec60dfd333bfd36c',
    fromPhone: '+18145686316',
  },
  workers: {
    checkInterval: 60,
    rotationInterval: 24 * 60 * 60,
  },
};

// Production Environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  name: 'production',
  hash_secret: 'xMz3frYUwHONpJdhzfv2ygpvIPf8ZlatUYdzT5flUSw=',
  maxChecks: 5,
  twilio: {
    accountSid: 'ACb0f4dc09da5bb486393893c78c408d83',
    authToken: '4162317f940f75d1ec60dfd333bfd36c',
    fromPhone: '+18145686316',
  },
  workers: {
    checkInterval: 60,
    rotationInterval: 24 * 60 * 60,
  },
};

// Determine which environment was passed as a command-line argument
const currentEnvironment =
  typeof process.env.NODE_ENV === 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

// Does currentEnvironment exist, if not default to 'development'
const env =
  typeof environments[currentEnvironment] !== 'undefined'
    ? environments[currentEnvironment]
    : environments.development;

export default env;
