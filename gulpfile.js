var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var gutil = require('gulp-util');
var amdOptimize = require('amd-optimize');
var eventStream = require("event-stream");
var order = require("gulp-order");
var gulpReplace = require('gulp-replace');
var minifyCss = require('gulp-minify-css');

var paths = {
    requireJS: 'bower_components/requirejs/require.js',
    scripts: ['js/**/*.js'],
    build: 'build',
    html : ['index.html'],
    css: 'css/**/*.css'
};

/**
 * Clean build folder
 */
gulp.task('clean', function(cb) {
  del([paths.build], cb);
});

/**
 * Build JS
 */
gulp.task('js', ['clean'], function() {

  return eventStream.merge(
        gulp.src(paths.requireJS).pipe(sourcemaps.init()),
        gulp.src(paths.scripts)
            .pipe(sourcemaps.init())
            .pipe(amdOptimize("main"))
            .pipe(concat("modules.js"))
  )
      .pipe(order(["**/require.js", "**/modules.js"]))
      .pipe(concat("app.min.js"))
      .pipe(uglify().on('error', gutil.log))
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest( paths.build + "/js"));
});

/**
 * Build CSS
 */
gulp.task('css', ['clean'], function() {

    return gulp.src(paths.css)
        .pipe(sourcemaps.init())
        .pipe(order(["**/reset.css", "**/*.css"]))
        .pipe(concat("all.min.css"))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest( paths.build + "/css"));
});

/**
 * Switch project to production mode
 */
gulp.task('prod', function(){
    gulp.src(paths.html)
        .pipe(gulpReplace(/<!--gulp-replace-dev-->/g, '<!--gulp-replace-dev|'))
        .pipe(gulpReplace(/<!--gulp-replace-prod\|/g, '<!--gulp-replace-prod-->'))
        .pipe(gulp.dest('.'));
});

/**
 * Switch project to development mode
 */
gulp.task('dev', function(){
    gulp.src(paths.html)
        .pipe(gulpReplace(/<!--gulp-replace-prod-->/g, '<!--gulp-replace-prod|'))
        .pipe(gulpReplace(/<!--gulp-replace-dev\|/g, '<!--gulp-replace-dev-->'))
        .pipe(gulp.dest('.'));
});

gulp.task('build', [ 'js', 'css', 'prod']);
gulp.task('default', [ 'js', 'css']);