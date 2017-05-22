var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  usemin = require('gulp-usemin'),
  path = require('path'),
  htmlReplace = require('gulp-html-replace'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  del = require('del');

var bases = {
  src: 'src',
  dist: 'dist',
}

var paths = {
  scripts: ['src/scripts/libs/**/*.js', 'src/scripts/**/*.js'],
  styles: ['src/styles/sass/**/*.scss'],
  css: ['src/styles/libs/**/*.css', 'src/styles/css/**/*.css'],
  html: ['src/**/*.html'],
  images: ['src/img/**/*'],
}

gulp.task('clean', function() {

  return gulp.src(bases.dist)
    .pipe(clean());
});

gulp.task('image', function() {

  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('sass', function() {

  gulp.src(paths.styles)
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('src/styles/css'))
});

gulp.task('styles', function() {

  gulp.src(paths.css)
    .pipe(concat('styles.min.css'))
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

gulp.task('watch', function () {
  var watcher = gulp.watch(['src/img/**/*', 'src/**/*.html']);

  watcher.on('change', function (event) {
    if (event.type === 'deleted') {
      var filePathFromSrc = path.relative(path.resolve('src'), event.path);

      var destFilePath = path.resolve('dist', filePathFromSrc);

      del.sync(destFilePath);
    }
  });
});
gulp.task('server', function() {

  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('src/styles/sass/**/*.scss', function(){
		runSequence(['sass']);
	});

  gulp.watch('src/styles/**/*.css', function(){
		runSequence(['styles']);
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
		'sass',
    'html',
    'watch',
	];

	runSequence(tasks, function () {
		gulp.start('styles');
	});

	runSequence(tasks, function () {
		gulp.start('server');
	});

});
