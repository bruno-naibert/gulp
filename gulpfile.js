var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin');

//Busca .sass
var scssFiles = 'development/assets/scss/**/*.scss';
//Destino css.min
var cssMinDest = 'site/assets/css/';

// Gera css do tipo não minificado
var sassBuild = {
  outputStyle: 'expanded'
}

//Tarefa padrão, roda com 'gulp'
gulp.task('default', ['sassBuild', 'watch']);

//Monitora SCSS > dispara a task 'sassBuild'
gulp.task('watch', function() {
  gulp.watch(scssFiles, ['sassBuild']);
});

//Compila SCSS > CSS > concatena > minifica > manda para a pasta 'site'
gulp.task('sassBuild', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassBuild)).on('error', sass.logError)
    .pipe(concat('style.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(cssMinDest));
});
