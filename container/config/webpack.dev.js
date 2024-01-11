const { merge } = require('webpack-merge');
// merges common config with dev config
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// ModuleFederationPlugin is used to share code between projects
const packageJson = require('../package.json');

// development-specific config
const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
    // publicPath is where the files will be served from
    // this is the base path used in development
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html',
    },
    // historyApiFallback is for when the user tries to go to a route that doesn't exist
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // tells webpack to look at the marketing remoteEntry file to get the code
        // the key is the name of the remote
        // the value is the name of the remoteEntry file
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        auth: 'auth@http://localhost:8082/remoteEntry.js',
        dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
// merge takes two objects and merges them together
// if there are any conflicts, it will use the second object's values
