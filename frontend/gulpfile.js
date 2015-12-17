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
  return sass('app/sass/*.scss')
     .on('error', sass.logError)
     .pipe(gulp.dest('dist/css'))
     .pipe(connect.reload());
});

// HTML
gulp.task('move-html', function(){
  return gulp.src('index.html')
        .pipe(gulp.dest('./dist'));
});
gulp.task('process-html', ['process-scripts','move-html'], function(){
    return gulp.src('./dist/index.html')
    .pipe(inject(
      gulp.src(mainBowerFiles(), {read: false}),
                 {ignorePath: 'dist', addRootSlash: false, name: 'bower'}))
          .pipe(gulp.dest('./dist'))
          .pipe(connect.reload());
});

// Javascript
//
var appFiles = [
  'app/javascript/employees/Employees.js',
  'app/javascript/employees/EmployeeController.js',
  'app/javascript/employees/EmployeeService.js',
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
    gulp.watch(['./app/sass/*.scss'], ['process-styles']);
});

gulp.task('default',['serve', 'process-html', 'watch', 'open']);
