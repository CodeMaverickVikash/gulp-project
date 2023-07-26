const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const minifyJS = require('gulp-terser'); // compressed js
const minifyCSS = require('gulp-csso'); // compressed css
const options = require('gulp-options');
const sourcemaps = require('gulp-sourcemaps');

const dest = '../bundles';
const scssPath = '../webapp/sass/**/*.scss';
const jsPath = '../webapp/js/**/*.js';

gulp.task('styles', function() {
    let tempTask = gulp.src(scssPath);
    function process() {
        tempTask = tempTask.pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(concat("cssBundle" + '.css'));
    }
    if(!options.has('dev')) {
        process();
    } else {
        tempTask = tempTask.pipe(sourcemaps.init());
        process();
        tempTask = tempTask.pipe(sourcemaps.write('.'))
    }
    return tempTask.pipe(gulp.dest(dest));
});

gulp.task('jsBuild', function(){
    let tempTask = gulp.src(jsPath);
    function process() {
        tempTask = tempTask.pipe(minifyJS())
        .pipe(concat("jsBundle" + '.js'));
    }
    if(!options.has('dev')) {
        process();
    } else {
        tempTask = tempTask.pipe(sourcemaps.init());
        process();
        tempTask = tempTask.pipe(sourcemaps.write('.'))
    }
    return tempTask.pipe(gulp.dest(dest));
})

gulp.task('withoutDevFlag', function(){
    return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat("copyStatic" + '.css'))
    .pipe(gulp.dest(dest));
});

const taskList = ['styles', 'jsBuild'];
gulp.task('default', gulp.series([
	gulp.parallel(taskList)
].concat(options.has('dev') ? [] : ['withoutDevFlag'])));