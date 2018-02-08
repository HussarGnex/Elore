const gulp = require('gulp'),
  exec = require('child_process').exec;

gulp.task('build', (callback) => {
  exec('ng build', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

gulp.task('watch', () => {
  gulp.watch('src/app/**/*.ts', ['build']);
  gulp.watch('src/app/**/*.html', ['build']);
  gulp.watch('src/app/**/*.css', ['build']);
  gulp.watch('src/app/*.ts', ['build']);
  gulp.watch('src/app/**/*.html', ['build']);
  gulp.watch('src/app/**/*.css', ['build']);
});
