var requireDir = require('require-dir');
requireDir('./gulp');

require('gulp').task('default', ['serve']);