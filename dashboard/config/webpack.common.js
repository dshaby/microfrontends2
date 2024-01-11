const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.vue'], // allows us to import files without specifying the extension
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|woff|eot|ttf)$/i, // regex to match file extensions
        use: [
          { loader: 'file-loader' },
          // file-loader will copy the files to the dist folder
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.scss|\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/, // only run babel on js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // @babel/preset-react is for JSX tags
            // preset-env is for modern JS features, es2015, es2016, etc
            plugins: ['@babel/plugin-transform-runtime'],
            // @babel/plugin-transform-runtime is for async/await
          },
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
