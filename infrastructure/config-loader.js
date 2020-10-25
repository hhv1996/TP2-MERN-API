const fs = require('fs');

/**
 * Returns environment variables based on currentEnv
 */
const GetAppConfig = () => {
  const config = JSON.parse(fs.readFileSync('app-config.json'));
  const env = config.app.currentEnv;

  return config.app[env];
};

/**
 * Returns database variables
 */
const GetDBConfig = () => {
  const config = JSON.parse(fs.readFileSync('db-config.json'));

  return config;
};

module.exports = { GetAppConfig, GetDBConfig };
