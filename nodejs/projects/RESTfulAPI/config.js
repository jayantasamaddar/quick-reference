// Container for all environments
const environments = {};

// Development Environment (Default)
environments.development = {
  httpPort: 3000,
  httpsPort: 3001,
  name: 'development',
};

// Production Environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  name: 'production',
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
