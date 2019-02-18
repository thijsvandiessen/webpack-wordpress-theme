const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {

  mode: 'production',

  output: {
    filename : '[name].[hash:8].js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [

          // 'style-loader',
          // MiniCssExtractPlugin.loader,

          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './'
            }
          },

          'css-loader',

          {
            // autoprefix
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

  optimization: {

    // Tree shaking
    usedExports: true,

    // minify js
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),

      // minify css
      new OptimizeCSSAssetsPlugin()
    ],
  },
  plugins: [

    // create css files
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: "[id].[hash:8].css"
    }),
  ],
});
