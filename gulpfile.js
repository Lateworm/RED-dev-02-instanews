const gulp 			= require('gulp'),

		babel 			= require('gulp-babel'), // transpile ES6 to ES5
		uglify 			= require('gulp-uglify'), // minify JS
		rename 			= require('gulp-rename'),
		eslint			= require('gulp-eslint'),

		sass 				= require('gulp-sass'), // compile SCSS files
    autoprefixer = require('gulp-autoprefixer'),
		cssnano 		= require('gulp-cssnano'), // minify SSS
		prettyError = require('gulp-prettyerror'),

		browserSync = require('browser-sync').create(); // https://browsersync.io/docs/gulp/
		
		
gulp.task('lintScripts', function() {
	return gulp.src(['./js/*.js','!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('buildScripts', ['lintScripts'], function(){
	gulp.src('./js/*.js')
		.pipe(babel())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('./build/js'))
});
	
gulp.task('sass', function() {
	 gulp.src('./sass/style.scss')
	 		.pipe(prettyError()) // Sass error handler
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css')) // helpful so we can see the compiled code
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css')); // final production version
});

gulp.task('watch', function() {					// watch for files that need to be built/compiled
	 gulp.watch('js/*.js', ['buildScripts']);
	 gulp.watch('sass/*.scss', ['sass']);
});	

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