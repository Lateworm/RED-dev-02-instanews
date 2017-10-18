var gulp = require('gulp');

// Now that we've installed the uglify package we can require it:
var uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('scripts', function(){
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js'))
	});
	
gulp.task('say_hello', function(){
    console.log('Hello!');
	});
	
// Modify our default task method by passing an array of task names
gulp.task('default', ['say_hello', 'scripts']);