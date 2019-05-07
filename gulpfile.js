"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var postcssCustomProperties = require('postcss-custom-properties');
var postcssCustomMedia = require('postcss-custom-media');
var sorting = require('postcss-sorting');
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var typograf = require('gulp-typograf');


gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      postcssCustomMedia(),
      postcssCustomProperties(),
      sorting()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));

gulp.task("typograf", function() {
  gulp.src("source/*.html")
    .pipe(typograf({ locale: ["ru", "en-US"] }))
    .pipe(gulp.dest("source/*.html"));
});