const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');


module.exports = merge(common, {
  mode: 'development',

  devServer: {
    contentBase: './dist',

    // let the browser know where we left of on reload
    historyApiFallback: true,

    // connect to the docker wordpress installation
    proxy: {
      '/': {
        target: 'http://localhost:8000/',
        changeOrigin: true
      }
    },

    // gzip compression
    compress: true,
    port: 4000,
    hot: true,
    open: 'chrome'
  },

  output: {
    filename : '[name].js',
    chunkFilename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // style loder can only be used in development
          'style-loader',
          'css-loader',
          {
            // css autoprefix
            loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')]
              },
          },
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
