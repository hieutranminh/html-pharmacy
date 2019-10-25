var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


gulp.task('sass',function(){
  return gulp.src('src/assets/scss/*.scss')
    .pipe(sass())
    .on('error', swallowError)
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
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);
  gulp.watch('src/assets/css/**/*.css',browserSync.reload);
});

function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString())
  this.emit('end')
}
