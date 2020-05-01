const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// See old config for notes on settings
// Configures different builds for different environment, passing in a variable through an argument passed to webpack. Merge is used to combine the parts together into a single configuration file.

module.exports = function (env) {

  const isDevelopment = env === 'development';
  console.log(`This is a ${isDevelopment ? "development" : "production"} build`);

  const baseConfig = {
    entry: './app/app.js',
    output: {
      path: path.resolve(__dirname, 'app/dist'),
      filename: 'app.bundle.js',
      publicPath: '/dist/',
    },
    module: { // rules match up modules with loaders that transform the code
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
            // options: could put babel configuration object here but we created a separate babel configuration file instead
          }
        }
      ]
    },
    plugins: [
    ]
  };

  const babelConfig = { // separarte config for babel allows you to selectively merge it into builds
    module: { 
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
            // options: could put babel configuration object here but we created a separate babel configuration file instead
          }
        }
      ]
    }
  }

  if (isDevelopment) {

    const devServerConfig = {
      devServer: {
        contentBase: path.resolve(__dirname, 'app'),
        publicPath: '/dist/',
        watchContentBase: false,
        hotOnly: true,
        overlay: true // displays errors?
        //host: "0.0.0.0" // remove to only host locally see devServer/host
      },
      plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ]
    };

    return isDevelopment ? 
           merge(baseConfig, devServerConfig, babelConfig) : // Development Configuration (could bypass babel transpilation when hosted locally by removing that configuration object from the merge arguments)
           merge(baseConfig, babelConfig); // Production Configuration
  }
};