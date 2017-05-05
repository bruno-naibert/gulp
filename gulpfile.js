var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;


var bases = {
  app: 'development/',
  dist: 'site/',
}

var paths = {
  scripts: ['development/assets/scripts/**/*.js', '!development/assets/scripts/libs/**/*.js'],
  libs: ['development/assets/scripts/libs/**/*.js'],
  styles: ['development/assets/styles/**/*.scss'],
  html: ['development/*.html'],
  images: ['development/assets/image/**/*'],
}

gulp.task('clean', function() {
 return gulp.src(bases.dist)
 .pipe(clean());
});


gulp.task('copy', ['clean'], function() {
 gulp.src(bases.app + 'development/**/*')
 .pipe(gulp.dest(bases.dist));
});

// sass > css do tipo não minificado
var sassBuild = {
  outputStyle: 'expanded'
}

gulp.task('styles-build', function() {
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
