const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production', //production mode will minify the code
  output: {
    filename: '[name].[contenthash].js', //Whenever we build files for prod, contenthash will change only when the content of the file changes, caching  //name is the name of the file
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', //this name is used to reference the remoteEntry.js file in index.html
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`, //this name is used to reference the remoteEntry.js file in index.html
      },
      shared: packageJson.dependencies, //this will share all the dependencies of the package.json file
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
