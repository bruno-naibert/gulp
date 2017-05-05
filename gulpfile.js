var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify');

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

//Tarefa padrão, roda com 'gulp'
gulp.task('default', ['sassBuild', 'minify-js', 'watch']);





//Compila SCSS > CSS > concatena > minifica > manda para a pasta 'site'
gulp.task('sassBuild', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassBuild)).on('error', sass.logError)
    .pipe(concat('style.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(cssMinDest));
});

gulp.task('minify-js', function() {
  gulp.src(jsFiles)
    .pipe(concat('js.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsMinDest));
});

//Monitora SCSS > dispara a task 'sassBuild'
gulp.task('watch', function() {
  gulp.watch(jsFiles, ['minify-js'])
  gulp.watch(scssFiles, ['sassBuild']);
});
