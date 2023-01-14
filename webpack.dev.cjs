const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",

  devServer: {
    static: "./dist",

    // let the browser know where we left of on reload
    historyApiFallback: true,

    // connect to the docker wordpress installation
    proxy: {
      "/": {
        target: "http://localhost:8000/",
        changeOrigin: true,
      },
    },

    // gzip compression
    compress: true,
    port: 4000,
    hot: true,
    open: "chrome",
  },

  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
