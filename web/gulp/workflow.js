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
gulp.task('watch.css', ['css'], function() {
  var reload = require('browser-sync').reload;
  return gulp.src('./app/css/app.css')
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['dependencies', 'browser-sync', 'watchers']);