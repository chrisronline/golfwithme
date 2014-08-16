var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var compass = require('gulp-compass');
var concat = require('gulp-concat');

var bowerSrc = 'app/bower_components';
var dev = {
  index: 'app/index.html',
  scripts: {
    src: 'app/components',
    dest: 'app/js'
  },
  html: {
    src: 'app/components'
  },
  vendor: {
    js: [
      bowerSrc + '/angularjs/angular.js',
      bowerSrc + '/angular-ui-router/release/angular-ui-router.js',
      bowerSrc + '/jquery/dist/jquery.js',
      bowerSrc + '/lodash/dist/lodash.js',
      bowerSrc + '/restangular/dist/restangular.js',
      bowerSrc + '/angular-form-for/dist/form-for.js'
    ],
    css: [
      bowerSrc + '/font-awesome/css/font-awesome.css',
      bowerSrc + '/normalize-css/normalize.css',
      // bowerSrc + '/angular-form-for/dist/form-for.css'
      // bowerSrc + '/bootstrap/dist/css/bootstrap.css'
    ]
  },
  sass: {
    src: 'app/components',
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
  gulp.src(dev.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(dev.sass.dest))
    .pipe(browserSync.reload({stream:true}));
  gulp.src(dev.vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dev.scripts.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('index', function() {
  return gulp.src(dev.index)
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function() {
  return gulp.src(dev.html.src + '/**/*.html')
    .pipe(browserSync.reload({stream:true}));
})

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
    gulp.watch(dev.index, ['index']);
    gulp.watch(dev.html.src + '/**/*.html', ['html']);
  }
);

gulp.task('default', ['watch', 'browser-sync']);
