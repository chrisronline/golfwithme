var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
// var compass = require('gulp-compass');
var sass = require('gulp-sass');
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
      bowerSrc + '/angular-form-for/dist/form-for.js',
      bowerSrc + '/ladda/js/spin.js',
      bowerSrc + '/ladda/js/ladda.js',
      bowerSrc + '/angular-ladda/src/angular-ladda.js',
      bowerSrc + '/satellizer/satellizer.js',
      bowerSrc + '/moment/moment.js',
      bowerSrc + '/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      bowerSrc + '/angular-bootstrap/ui-bootstrap-tpls.js'
    ],
    css: [
      bowerSrc + '/font-awesome/css/font-awesome.css',
      bowerSrc + '/ladda/dist/ladda.min.css',
    ],
    scss: [
      bowerSrc + '/bootstrap-sass-official/assets/stylesheets/**/*.scss'
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

gulp.task('clean-css', function(cb) {
  del([dev.sass.dest], cb);
})
gulp.task('compile-scss', ['clean-css', 'compile-vendor'], function() {
  return gulp.src(dev.sass.src + '/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: [dev.bower.src]
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(dev.sass.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compile-vendor', function() {
  if (dev.vendor.css.length) {
    gulp.src(dev.vendor.css)
      .pipe(concat('vendor.css'))
      .pipe(gulp.dest(dev.sass.dest))
      .pipe(browserSync.reload({stream:true}));
  }
  if (dev.vendor.js.length) {
    gulp.src(dev.vendor.js)
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest(dev.scripts.dest))
      .pipe(browserSync.reload({stream:true}));
  }
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
