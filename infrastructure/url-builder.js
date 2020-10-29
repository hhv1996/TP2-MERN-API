var configLoader = require('./config-loader');

const config = configLoader.GetDBConfig();

const build = () => {
  return config.db_data.baseUri
    .replace('<user>', config.db_data.creds.name)
    .replace('<password>', config.db_data.creds.password)
    .replace('<db>', '');
};

module.exports = { build };
