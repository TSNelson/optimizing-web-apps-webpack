// To debug a webpack build, run: node --inspect-brk node_modules/.bin/webpack --env production (add nodejs inspector plugin to chrome)

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
          use: [ // use an array to specify a pipeline of multiple loaders to use
            {
              loader: 'tee-loader', // last in pipeline
              options: {
                label: 'after babel transpile'
              }
            },
            {loader: 'babel-loader'
            // options: could put babel configuration object here but we created a separate babel configuration file instead
            },
            {
              loader: 'tee-loader', // first in pipeline
              options: {
                label: 'before babel transpile'
              }
            }
          ]
        }
      ]
    },
    resolveLoader: { // add paths to loaders not found in node_modules
      alias: {
        "tee-loader": path.resolve(__dirname, 'tee-loader.js')
      }
    }
  };

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

  // returns a different configuration object depending on the build script
  return isDevelopment ? 
         merge(baseConfig, devServerConfig, babelConfig) : // Development
         merge(baseConfig, babelConfig); // Production
};