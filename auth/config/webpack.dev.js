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
  output: {
    publicPath: 'http://localhost:8082/',
    // publicPath is where the files will be served from
    // this is the base path used in development
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: '/index.html',
    },
    // historyApiFallback is for when the user tries to go to a route that doesn't exist
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        // exposes tells webpack which files to make available to other projects
        './AuthApp': './src/bootstrap',
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
