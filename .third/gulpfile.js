'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var less = require('gulp-less');

var lessDir = '../public/less';
var targetCSSDir = '../client/styles';


gulp.task('css', function () {
    return gulp.src(lessDir + '/*.less')
        .pipe(less({ style: 'compressed' }).on('error', gutil.log))
        .pipe(gulp.dest(targetCSSDir))
        .pipe(notify('CSS was built'))
});

gulp.task('watch', function () {
    gulp.watch(lessDir + '/*.less', ['css']);
});

gulp.task('default', ['css', 'watch']);
