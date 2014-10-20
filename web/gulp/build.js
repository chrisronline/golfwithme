var gulp = require('gulp');
gulp.task('build.clean', function(cb) {
  var del = require('del');
  del(['dist'], cb);
});
gulp.task('build', ['build.clean'], function() {
  var concat = require('gulp-concat');
  var es = require('event-stream');
  var inject = require('gulp-inject');
  var filter = require('gulp-filter');
  var mainBowerFiles = require('main-bower-files');
  var files = mainBowerFiles();

  var jsFilter = filter('**/*.js');
  var cssFilter = filter('**/*.css');

  var pluginsStream = gulp.src(files)
    .pipe(jsFilter)
      .pipe(concat('plugins.js'))
      .pipe(gulp.dest('dist/js'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
      .pipe(concat('plugins.css'))
      .pipe(gulp.dest('dist/css'))
    .pipe(cssFilter.restore())

  var scriptsStream = gulp.src('./app/components/**/*.js')
    .pipe(concat('components.js'))
    .pipe(gulp.dest('dist/js'));

  var cssStream = gulp.src('./app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  return gulp.src('./app/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(inject(pluginsStream, {name:'bower',relative:true}))
    .pipe(inject(es.merge(scriptsStream, cssStream), {relative:true}))
    .pipe(gulp.dest('dist'));
});