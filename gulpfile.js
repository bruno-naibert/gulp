var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  usemin = require('gulp-usemin'),
  htmlReplace = require('gulp-html-replace'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

var bases = {
  src: 'src',
  dist: 'dist',
}

var paths = {
  scripts: ['src/scripts/libs/**/*.js', 'src/scripts/**/*.js'],
  styles: ['src/styles/**/*.scss'],
  css: ['src/styles/**/*.css'],
  html: ['src/**/*.html'],
  images: ['dist/image/**/*'],
}

gulp.task('clean', function() {

  return gulp.src(bases.dist)
    .pipe(clean());
});

gulp.task('image', function() {

  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('styles', function() {

  gulp.src(paths.styles)
    .pipe(sass()).on('error', sass.logError)
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({match: "**/*.css"}));
});

gulp.task('styles-lib', function() {

  gulp.src(paths.css)
    .pipe(concat('vendors.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({match: "**/*.css"}));
});

gulp.task('scripts', function() {

  gulp.src(paths.scripts)
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('server', function() {

  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('src/styles/sass/**/*.scss', function(){
		runSequence(['styles']);
	});

  gulp.watch('src/styles/**/*.css', function(){
		runSequence(['styles-lib']);
	});

  gulp.watch('src/scripts/**/*.js', function(){
		runSequence(['scripts'], function () {
			reload();
    });
  });

  gulp.watch('src/**/*.html', function(){
    runSequence(['html'], function () {
      reload();
    });
  });
  gulp.watch('src/img/**/*', function(){
    runSequence(['image'], function () {
      reload();
    });
  });
});

gulp.task('default', ['clean'], function () {

	var tasks = [
    'image',
		'scripts',
		'styles',
		'styles-lib',
    'html',
	];

	runSequence(tasks, function () {
		gulp.start('server');
	});

});
