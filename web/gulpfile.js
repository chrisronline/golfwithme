var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rimraf = require('gulp-rimraf');
var gulpFilter = require('gulp-filter');
var order = require('gulp-order');

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
      'jquery/dist/jquery.js',
      'angularjs/angular.js',
      'angular-ui-router/release/angular-ui-router.js',
      'lodash/dist/lodash.js',
      'restangular/dist/restangular.js',
      'angular-form-for/dist/form-for.js',
      'ladda/js/spin.js',
      'ladda/js/ladda.js',
      'angular-ladda/src/angular-ladda.js',
      'satellizer/satellizer.js',
      'moment/moment.js',
      'bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'angular-bootstrap/ui-bootstrap-tpls.js',
      'angular-promise-cache/angular-promise-cache.js',
      'angular-float-labels/angular-float-labels.js',
      'selectize/dist/js/standalone/selectize.js',
      'ng-table/ng-table.js'
    ],
    css: [
      'ladda/dist/ladda.min.css',
      'angular-float-labels/angular-float-labels.css',
      'selectize/dist/css/selectize.bootstrap3.css',
      'ng-table/ng-table.css'
    ],
    fonts: [
      bowerSrc + '/font-awesome/fonts/*',
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
  fonts: {
    src: 'app/fonts',
    dest: 'app/fonts'
  }
};

gulp.task('compile-scripts', function() {
  return gulp.src(dev.scripts.src + '/**/*.js')
    .pipe(plumber())
    .pipe(concat('components.js'))
    .pipe(gulp.dest(dev.scripts.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('clean-css', function() {
  return gulp.src(dev.sass.dest + '/*.css', {read:false})
    .pipe(rimraf());
})
gulp.task('compile-scss', ['clean-css', 'compile-vendor'], function() {
  return gulp.src(dev.sass.src + '/_scss/app.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: [dev.bower.src, dev.sass.src]
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(dev.sass.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compile-vendor', function() {
  var jsFilter = gulpFilter(dev.vendor.js);
  var cssFilter = gulpFilter(dev.vendor.css);

  return gulp.src(bowerSrc + '/**/*')
    .pipe(cssFilter)
      .pipe(order(dev.vendor.css))
      .pipe(concat('vendor.css'))
      .pipe(gulp.dest(dev.sass.dest))
      .pipe(cssFilter.restore())
    .pipe(jsFilter)
      .pipe(order(dev.vendor.js))
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest(dev.scripts.dest))
      .pipe(jsFilter.restore());
});

gulp.task('assemble-fonts', function() {
  gulp.src(dev.vendor.fonts)
    .pipe(gulp.dest(dev.fonts.dest))
    .pipe(browserSync.reload({stream:true}));
})

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
  'assemble-fonts',
  'browser-sync'], function() {
    gulp.watch(dev.scripts.src + '/**/*.js', ['compile-scripts']);
    gulp.watch(dev.vendor.list, ['compile-vendor']);
    gulp.watch(dev.sass.src + '/**/*.scss', ['compile-scss']);
    gulp.watch(dev.index, ['index']);
    gulp.watch(dev.html.src + '/**/*.html', ['html']);
  }
);

gulp.task('default', ['watch', 'browser-sync']);
