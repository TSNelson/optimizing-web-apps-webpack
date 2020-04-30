const path = require('path'); // use to create absolute paths where needed
const webpack = require('webpack'); // needed to instantiate webpack plugins

module.exports = {
  entry: './app/app.js', // entry points are relative paths
  output: {
    path: path.resolve(__dirname, 'app/dist'), // specify output with an absolute path
    filename: 'app.bundle.js',
    publicPath: '/dist/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'app'), // tell the dev server where you serve files from (default is the current directory)
    publicPath: '/dist/', // directs to location where output from webpack is located
    watchContentBase: true, // live reload file changes w/in the contentBase, set to false when using HMR or you'll still see reloads
    hot: true // set when using HotModuleReplacementPlugin (change to hotOnly to turn off fallback to reloads when HMR is not possible)
  },
  plugins: [ // use plugins to add features
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};