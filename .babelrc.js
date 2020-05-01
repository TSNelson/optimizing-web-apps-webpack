module.exports = { 
  presets: [
    ['@babel/preset-env', {
      debug: false, // set to true to display details like plugin defaults
      modules: false, // turns off module type transformation plugin
      targets: {
        browsers: ['> 1%', 'not IE < 12'] // browserlist strings used to determine with plugins need to be enabled
      },
      useBuiltIns: 'usage' // 'usage' examines your code and selected browsers to optimize which polyfills are needed. 'entry' includes all polyfills for the selected browsers 
    }]
  ]
};