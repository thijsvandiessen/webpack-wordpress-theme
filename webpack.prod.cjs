const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");

module.exports = merge(common, {
  mode: "production",

  output: {
    filename: "[name].[hash:8].js",
  },

  optimization: {
    // Tree shaking
    usedExports: true,
  },
});
