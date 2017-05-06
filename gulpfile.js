var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  usemin = require('gulp-usemin'),
  htmlReplace = require('gulp-html-replace'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

// sass > css do tipo não minificado
var sassBuild = {
  outputStyle: 'expanded'
}

var bases = {
  src: 'src',
  dist: 'dist',
}

var paths = {
  scripts: ['src/js/**/*.js', '!src/js/libs/**/*.js'],
  libs: ['src/js/libs/**/*.js'],
  styles: ['src/css/**/*.css', '!src/css/libs/**/*.css'],
  html: ['src/*.html'],
  images: ['src/img/**/*'],
}

gulp.task('default', ['copy'], function() {
  gulp.start('styles-build', 'scripts-build', 'build-html');
});

gulp.task('clean', function() {
  return gulp.src([bases.dist])
    .pipe(clean());
});

gulp.task('copy', ['clean'], function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'))
});

gulp.task('styles-build', function() {
  gulp.src(paths.styles)
    .pipe(sass(sassBuild)).on('error', sass.logError)
    .pipe(concat('style.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts-build', function() {
  gulp.src(paths.libs, paths.scripts)
    .pipe(concat('js.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build-html', function() {
  gulp.src('src/**/*.html')
    .pipe(htmlReplace({
      js: 'js/js.min.js',
      css: 'css/style.min.css'
    }))
    .pipe(gulp.dest('dist'))
});
