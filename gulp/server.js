'use strict';

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

var historyApiFallback = require('connect-history-api-fallback');


function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === 'src' || (util.isArray(baseDir) && baseDir.indexOf('src') !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: historyApiFallback,
      routes: routes
    },
    browser: browser
  });

}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    '.tmp',
    'src'
  ], [
    '.tmp/{app,components}/**/*.css',
    'src/{app,components}/**/*.js',
    'src/assets/images/**/*',
    '.tmp/*.html',
    '.tmp/{app,components}/**/*.html',
    'src/*.html',
    'src/{app,components}/**/*.html'
  ]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit('dist');
});
