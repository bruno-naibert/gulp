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
  scripts: ['development/assets/scripts/**/*.js', '!development/assets/scripts/libs/**/*.js'],
  libs: ['development/assets/scripts/libs/**/*.js'],
  styles: ['development/assets/styles/**/*.scss'],
  html: ['development/*.html'],
  images: ['development/assets/image/**/*'],
}

gulp.task('copy', ['clean'], function() {
  return gulp.src(bases.app + '/**/*')
    .pipe(gulp.dest(bases.dist));
});

gulp.task('clean', function() {
  return gulp.src(bases.dist)
    .pipe(clean());
});

gulp.task('styles-build', ['copy'], function() {
  gulp.src(paths.styles)
    .pipe(sass(sassBuild)).on('error', sass.logError)
    .pipe(concat('style.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(cssMinDest));
});

gulp.task('scripts-build', function() {
  gulp.src(jsFiles)
    .pipe(concat('js.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsMinDest));
});

gulp.task('watch', function() {
  gulp.watch(jsFiles, ['scripts-build'])
  gulp.watch(scssFiles, ['styles-build']);
});
