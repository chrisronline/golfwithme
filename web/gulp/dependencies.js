var gulp = require('gulp');
gulp.task('dependencies', function() {
  var inject = require('gulp-inject');
  var mainBowerFiles = require('main-bower-files');
  var files = mainBowerFiles();
  return gulp.src('./app/index.html')
    .pipe(inject(gulp.src(files, {read:false}), {name:'bower',relative:true}))
    .pipe(inject(gulp.src('./app/components/**/*.js', {read:false}), {relative:true}))
    .pipe(gulp.dest('./app'));
});