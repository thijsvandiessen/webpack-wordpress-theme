const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/index.js"),
  },

  // The base directory
  context: path.resolve(__dirname, ""),

  // great for bug fixing
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash:8].[ext]",
              outputPath: "assets/",
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].[hash:8].js",

    // relative to HTML page
    publicPath: "",
  },

  plugins: [new CleanWebpackPlugin({})],
};
