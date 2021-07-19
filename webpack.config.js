const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  mode: "production",
  entry: "./public/index.js",
  output: {
    publicPath: "",
    path: __dirname + "/public/dist",
    filename: "bundle.js"
  },
  plugins: [
    new WebpackPwaManifest({
      filename: "manifest.json",
      name: "Budget Travel App",
      short_name: "Budget App",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      start_url: "/",
      fingerprints:false,
      icons: [
        {
          src: path.resolve("public/icons/icon-192x192.png"),
          sizes: [192, 512],
          destination: path.join("icons")
        }
      ]
    })
  ],
  // add configuration to use babel-loader here,
  //   destination: path.join("public","icons")
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    }]
  }
};
module.exports = config;
