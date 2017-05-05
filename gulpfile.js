var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

// sass > css do tipo não minificado
var sassBuild = {
  outputStyle: 'expanded'
}

var bases = {
  app: 'src',
  dist: 'dist',
}

var paths = {
  scripts: ['src/js/**/*.js', '!src/js/libs/**/*.js'],
  libs: ['src/js/libs/**/*.js'],
  styles: ['src/css/**/*.css'],
  html: ['dist/*.html'],
  images: ['dist/image/**/*'],
}

gulp.task('clean', function() {
  return gulp.src([bases.dist])
    .pipe(clean());
});

gulp.task('copy', ['clean'], function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'))
});

gulp.task('styles-build', ['copy'], function() {
  gulp.src(paths.styles)
    .pipe(sass(sassBuild)).on('error', sass.logError)
    .pipe(concat('style.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts-build', ['copy'], function() {
  gulp.src(paths.libs, paths.scripts)
    .pipe(concat('js.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['styles-build', 'scripts-build']);
