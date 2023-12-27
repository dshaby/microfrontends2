const HtmlWebpackPlugin = require('html-webpack-plugin');
// takes template html file and injects script tags

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // only run babel on js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            // @babel/preset-react is for JSX tags
            // preset-env is for modern JS features, es2015, es2016, etc
            plugins: ['@babel/plugin-transform-runtime'],
            // @babel/plugin-transform-runtime is for async/await
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
