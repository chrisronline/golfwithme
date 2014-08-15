var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var compass = require('gulp-compass');
var concat = require('gulp-concat');

var bowerSrc = 'app/bower_components';
var dev = {
  scripts: {
    src: 'app/scripts',
    dest: 'app/js'
  },
  templates: {
    src: 'app/views',
    dest: 'app/templates'
  },
  vendor: {
    list: [
      bowerSrc + '/angularjs/angular.js'
    ]
  },
  sass: {
    src: 'app/sass',
    dest: 'app/css'
  },
  images: {
    src: 'app/images',
    dest: 'app/images'
  },
  bower: {
    src: bowerSrc
  },
};

gulp.task('compile-scripts', function() {
  return gulp.src(dev.scripts.src + '/**/*.js')
    .pipe(plumber())
    .pipe(concat('components.js'))
    .pipe(gulp.dest(dev.scripts.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compile-scss', function() {
  return gulp.src(dev.sass.src + '/**/*.scss')
    .pipe(plumber())
    .pipe(compass({
      import_path: dev.bower.src,
      css: dev.sass.dest,
      sass: dev.sass.src,
      image: dev.images.src
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(dev.sass.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compile-vendor', function() {
  return gulp.src(dev.vendor.list)
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest(dev.scripts.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
  browserSync({
    open: false,
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('watch', [
  'compile-scripts',
  'compile-vendor',
  'compile-scss',
  'browser-sync'], function() {
    gulp.watch(dev.scripts.src + '/**/*.js', ['compile-scripts']);
    gulp.watch(dev.vendor.list, ['compile-vendor']);
    gulp.watch(dev.sass.src + '/**/*.scss', ['compile-scss']);
  }
);

gulp.task('default', ['watch', 'browser-sync']);
