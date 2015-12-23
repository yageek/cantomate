var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass'),
    open = require('gulp-open'),
    concat = require("gulp-concat"),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject')
    mainBowerFiles = require('main-bower-files');


// Styles
gulp.task('process-styles', function(){
  return sass('sass/*.scss')
     .on('error', sass.logError)
     .pipe(gulp.dest('dist/css'))
     .pipe(connect.reload());
});
// Assets
gulp.task('copy-assets', function(){
  return gulp.src('./assets/**/*')
        .pipe(gulp.dest('./dist/assets'));
});

// HTML
gulp.task('move-html', function(){
  return gulp.src('index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('process-html', ['process-scripts','move-html', 'copy-assets'], function(){
    return gulp.src('./dist/index.html')
    .pipe(inject(
      gulp.src(mainBowerFiles(), {read: false}),
                 {ignorePath: 'dist', addRootSlash: false, name: 'bower'}))
          .pipe(gulp.dest('./dist'))
          .pipe(connect.reload());
});

// Javascript
var appFiles = [
  'app/javascript/banks/Banks.js'
              ]
gulp.task('process-scripts', function(){
    return gulp.src(appFiles)
          .pipe(concat('app.js'))
          //.pipe(uglify())
          .pipe(gulp.dest('./dist/javascript'))
          .pipe(connect.reload());
});
//Server
gulp.task('serve', function(){
  connect.server({
    root: './dist',
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
    gulp.watch(['./*.html'], ['process-html']);
    gulp.watch(['./sass/*.scss'], ['process-styles']);
});

gulp.task('default',['serve', 'process-html', 'watch', 'open']);
