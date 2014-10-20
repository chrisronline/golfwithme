var gulp = require('gulp');
gulp.task('css', function() {
  var sass = require('gulp-sass');
  return gulp.src('./app/components/_scss/app.scss')
    .pipe(sass({
      includePaths: ['app/bower_components', 'app/components']
    }))
    .pipe(gulp.dest('./app/css'))
});