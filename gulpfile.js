var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');

gulp.task('copy:local', () => {
  gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./public/js'));
});

gulp.task('copy:modules', () => {
  gulp.src('./node_modules/file-saver/FileSaver.min.js')
    .pipe(gulp.dest('./public/js'))
})

gulp.task('compile:pug', () => {
  gulp.src(`./src/pug/*.pug`)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(`./public`));
});

gulp.task('compile:css', () => {
  gulp.src(`./src/stylus/theme.styl`)
    .pipe(stylus())
    .pipe(gulp.dest(`./public}`));
});
gulp.task('copy', ['copy:modules', 'copy:local']);
gulp.task('compile', ['copy', 'compile:css', 'compile:pug'])

gulp.task('watch', () => {
  return gulp.watch('./src/**/*.*', ['compile'])
})

gulp.task('default', ['compile']);
