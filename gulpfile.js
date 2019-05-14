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
var webp = require('gulp-webp');
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var del = require('del');
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

// gulp.task("css-old", function () {
//   return gulp.src("source/less/style.less")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(less())
//     .pipe(postcss([
//       autoprefixer(),
//       postcssCustomMedia(),
//       postcssCustomProperties(),
//       sorting()
//     ]))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("source/css"))
//     .pipe(server.stream());
// });



gulp.task("make-webp", () =>
  gulp.src('source/img/*.png')
  .pipe(webp())
  .pipe(gulp.dest('source/img'))
);

gulp.task("optimize-images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**",
      "source/*.ico"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

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
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon_*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("auto-sprite.svg"))
    .pipe(gulp.dest("source/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "html"
));

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/icon_*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));
