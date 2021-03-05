const { src, dest, series, parallel } = require('gulp')
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const rename = require("gulp-rename");
const cssnano = require("gulp-cssnano");


function cleanDist() {
    return src('./dist', {read: false}).pipe(clean())
}

function copyHtml() {
    console.log('Copying html')
    return src('./src/index.html')
            .pipe(dest('./dist'))
}

function copyJs() {
    console.log('Copying js')
    return src('./src/**/*.js')
            .pipe(concat('all.js'))
            .pipe(uglify())
            .pipe(rename({ suffix: '-min' }))
            .pipe(dest('./dist'))
}

function copyCss() {
    console.log('Copying css')
    return src('./src/styles/*.css')
        .pipe(concat('all.css'))
        .pipe(cssnano())
        .pipe(rename({ suffix: '-min' }))
        .pipe(dest('./dist'))
}

function vendorCss() {
    return src('../css/**/*.css')
        .pipe(concat('vendor.css'))
        .pipe(cssnano())
        .pipe(rename({ suffix: '-min' }))
        .pipe(dest('./dist'))
}

function watchFiles() {
    watch('./src/**/*.js', { events: 'all'}, copyJs)
}

module.exports = {
    build: series(cleanDist, parallel(copyJs, copyHtml, copyCss, vendorCss)),
    serve: series(cleanDist, parallel(copyJs, copyHtml, copyCss, vendorCss), watchFiles)
};