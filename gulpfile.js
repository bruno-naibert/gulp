var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  usemin = require('gulp-usemin'),
  htmlReplace = require('gulp-html-replace'),
  browserSync = require('browser-sync');

// sass > css do tipo não minificado
var sassBuild = {
  outputStyle: 'expanded'
}

var bases = {
  src: 'src',
  dist: 'dist',
}

var paths = {
  scripts: ['src/scripts/**/*.js'],
  styles: ['src/styles/**/*.scss'],
  html: ['src/**/*.html'],
  images: ['dist/image/**/*'],
}

gulp.task('clean', function() {

  return gulp.src([bases.dist])
    .pipe(clean());
});

gulp.task('copy', ['clean'], function() {

  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('styles-build', ['copy'], function() {

  gulp.src(paths.styles)
    .pipe(sass(sassBuild)).on('error', sass.logError)
    .pipe(concat('style.min.css'))
    //.pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts-build', ['copy'], function() {
  gulp.src(paths.scripts)
    .pipe(concat('scripts.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build-html', ['copy'], function() {
  gulp.src('src/**/*.html')
    .pipe(htmlReplace({
      //js: 'js/js.min.js',
      css: 'css/style.min.css'
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['copy'], function() {
  gulp.watch('src/**/*', ['default']);
});

gulp.task('default', ['copy', 'styles-build', 'scripts-build', 'build-html', 'watch'])
