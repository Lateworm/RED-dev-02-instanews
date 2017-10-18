var gulp = require('gulp');

// Now that we've installed the uglify package we can require it:
var uglify 			= require('gulp-uglify'),
		rename 			= require('gulp-rename'),
		gulp   			= require('gulp'),
		browserSync = require('browser-sync').create(),
		eslint			= require('gulp-eslint');

		
gulp.task('watch', function() {
   gulp.watch('js/*.js', ['buildScripts']);
});		
	
gulp.task('lintScripts', function() {
	return gulp.src(['./js/*.js','!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('buildScripts', ['lintScripts'], function(){
	gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('./build/js'))
});
	
// https://browsersync.io/docs/gulp/
gulp.task('browser-sync', function() {
    browserSync.init({
			server: {
				baseDir: "./"
				}
			});
		gulp.watch(['index.html', 'build/css/*.css', 'js/*.js'])
		.on('change', browserSync.reload);
});
	
// Modify our default task method by passing an array of task names
gulp.task('default', ['watch', 'browser-sync']);

// Break out of continuing Gulp tasks: ^c