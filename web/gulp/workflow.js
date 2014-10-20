var gulp = require('gulp');
gulp.task('browser-sync', function() {
  var browserSync = require('browser-sync');
  browserSync({
    open: false,
    port: 3009,
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('watchers', function() {
  gulp.watch('./app/components/**/*.scss', ['watch.css']);
});
gulp.task('watch.css', function() {
  var reload = require('browser-sync').reload;
  var sass = require('gulp-sass');
  return gulp.src('./app/components/_scss/app.scss')
    .pipe(sass({
      includePaths: ['app/bower_components', 'app/components']
    }))
    .pipe(gulp.dest('./app/css'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['dependencies', 'browser-sync', 'watchers']);