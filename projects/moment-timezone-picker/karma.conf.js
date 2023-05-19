// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('../../jasmine-seed-reported'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser,
      jasmine: {
        random: true
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true,
    },
    reporters: ['progress', 'jasmine-seed'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      ChromeHeadlessDocker: {
        base: 'ChromeHeadless',
        flags: ['--disable-translate', '--disable-extensions', '--no-sandbox'],
      },
    },
    browsers: ['ChromeHeadlessDocker'],
    singleRun: true,
    restartOnFileChange: true,
  });
};
