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
    port: 8081,
    historyApiFallback: {
      index: 'index.html',
    },
    // historyApiFallback is for when the user tries to go to a route that doesn't exist
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        // exposes tells webpack which files to make available to other projects
        './MarketingApp': './src/bootstrap',
        // key is the name of the file
        // value is the path to the file
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
