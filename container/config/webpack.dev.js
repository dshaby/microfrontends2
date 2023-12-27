const { merge } = require('webpack-merge');
// merges common config with dev config
const HtmlWebpackPlugin = require('html-webpack-plugin');
// takes template html file and injects script tags
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// ModuleFederationPlugin is used to share code between projects
const packageJson = require('../package.json');

// development-specific config
const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
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
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
// merge takes two objects and merges them together
// if there are any conflicts, it will use the second object's values
