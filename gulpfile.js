var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

//Busca .sass
var scssFiles = 'development/assets/scss/**/*.scss';
//Destino css.min
var cssMinDest = 'site/assets/css/';

//Busca JS
var jsFiles = 'development/assets/js/**/*.js';
//Destino js.min
var jsMinDest = 'site/assets/js'

// Gera css do tipo não minificado
var sassBuild = {
  outputStyle: 'expanded'
}

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './site'
    }
  });

  gulp.watch('scssFiles', 'site/*html', 'jsFiles').on("change", reload);
})

gulp.task('default', ['styles-build', 'scripts-build', 'watch', 'serve']);

gulp.task('styles-build', function() {
  gulp.src(scssFiles)
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
