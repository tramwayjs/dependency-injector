"use strict";

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');

const DEV_DIRECTORY = 'dev/**/*.js';
const DIST_DIRECTORY = 'dist';

gulp.task('build', function() {
    return gulp
        .src(DEV_DIRECTORY)
        .pipe(sourcemaps.init())
        .pipe(babel({
            "plugins": [
                "transform-flow-strip-types"
            ],
            "presets": [
                "es2015-node6"
            ]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST_DIRECTORY))
        .pipe(livereload());
});

gulp.task('watch', ['build'], function(){
    livereload.listen();
    gulp.watch(DEV_DIRECTORY, ['build']);
});

gulp.task('default', ['watch']);