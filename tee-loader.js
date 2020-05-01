// Custom loader to log changes to files as they pass through loaders
// Refer to the Loader API for functions you can use in custom loaders
const loaderUtils = require('loader-utils');



module.exports = function (source) {
  const options = loaderUtils.getOptions(this); // retrieves options passed to loader

  console.groupCollapsed(`[tee-loader ${options.label}]: ${this.resource}`);
  console.log(source);
  console.groupEnd();
  return source;
}