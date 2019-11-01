var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssvars = require('postcss-simple-vars');
var postcssMixin = require('postcss-mixins');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var browserSync = require('browser-sync').create();


gulp.task('css',function(){
  var plugins = [
    cssImport,
    postcssMixin,
    cssvars,
    nested,
    autoprefixer,
    cssnano()
  ];
  return gulp.src('src/assets/postcss/main.css')
    .on('error', swallowError)
    .pipe(postcss(plugins))
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  gulp.watch('src/*.html',browserSync.reload);
  gulp.watch('src/*/*.html',browserSync.reload);
  gulp.watch('src/assets/postcss/**/*.css', function () {
    browserSync.reload();
    gulp.start('css');
  });
  gulp.watch('src/assets/css/**/*.css',browserSync.reload);
});

function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString())
  this.emit('end')
}
