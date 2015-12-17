var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass'),
    open = require('gulp-open');


//Sass
gulp.task('process-styles', function(){
  return sass('app/sass/*.scss')
     .on('error', sass.logError)
     .pipe(gulp.dest('app/css'))
     .pipe(connect.reload());
});

// html
gulp.task('html', function(){
    return gulp.src('./*.html')
          .pipe(connect.reload());
});

//Server
gulp.task('serve', function(){
  connect.server({
    port: 8888,
    livereload: true
  });
});
// Open browser

gulp.task('open', function(){
  gulp.src('./index.html')
  .pipe(open({uri: 'http://localhost:8888'}));
});

gulp.task('watch', function(){
    gulp.watch(['./*.html'], ['html']);
    gulp.watch(['./app/sass/*.scss'], ['process-styles']);
});

gulp.task('default',['serve', 'watch', 'open']);
