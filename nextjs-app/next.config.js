/* eslint-disable @typescript-eslint/no-unused-expressions */
webpack: (config) => {
  config.watchOptions = {
    poll: 1000,
    aggregateTimeout: 300,
  };
  return config;
};
