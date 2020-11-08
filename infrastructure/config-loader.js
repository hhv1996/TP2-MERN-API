const fs = require('fs');
const path = require('path');

/**
 * Returns environment variables based on currentEnv
 */
const GetAppConfig = () => {
  const config = JSON.parse(path.resolve('./config/app-config.json'));
  const env = config.app.currentEnv;

  return config.app[env];
};

/**
 * Returns database variables
 */
const GetDBConfig = () => {
  const config = JSON.parse(
    fs.readFileSync(path.resolve('./config/db-config.json'))
  );

  return config;
};

module.exports = { GetAppConfig, GetDBConfig };
