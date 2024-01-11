const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8083/',
    // publicPath is where the files will be served from
    // this is the base path used in development
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: '/index.html',
      // historyApiFallback: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      // this is to allow the dashboard to be loaded from any domain
      // this is only for development
    },
    // historyApiFallback is for when the user tries to go to a route that doesn't exist
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
