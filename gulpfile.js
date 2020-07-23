'use strict';
var gulp = require('gulp');
var minify = require('gulp-clean-css');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourceMap = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var path = require('path');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var cssBase64 = require('gulp-base64');
var del = require('del');
var config = require('./config');

// 删除文件
gulp.task('clean', function (cb) {
  del(['dist/css/*', 'dist/js/*', 'dist/img/*', 'dist/views/*', 'dist/lib/*']).then(function (results) {
    cb();
  });
});

// 压缩ejs
gulp.task('ejs', ['clean'], function () {
  return gulp.src('views/**/*.ejs')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/views/'));
});
// 非依赖型压缩ejs
gulp.task('ejsInDept', function () {
  return gulp.src('views/**/*.ejs')
    .pipe(gulp.dest('dist/views/'));
});
// 依赖型ejs
gulp.task('ejsBuildDev', ['clean'], function () {
  return gulp.src('views/**/*.ejs')
    .pipe(gulp.dest('dist/views/'));
});

// 压缩less
gulp.task('less', ['clean'], function () {
  return gulp.src('public/less/**/*.less')
    .pipe(sourceMap.init())
    .pipe(plumber())
    .pipe(less({
      globalVars: config.less.globalVars
    }))
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(cssBase64())
    .pipe(minify())
    .pipe(sourceMap.write('.'))
    .pipe(gulp.dest('dist/css/'));
});
// 非依赖型压缩less
gulp.task('lessInDept', function () {
  return gulp.src('public/less/**/*.less')
    .pipe(sourceMap.init())
    .pipe(plumber())
    .pipe(less({
      globalVars: config.less.globalVars
    }))
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(sourceMap.write('.'))
    .pipe(gulp.dest('dist/css/'));
});
// 依赖型less
gulp.task('lessBuildDev', ['clean'], function () {
  return gulp.src('public/less/**/*.less')
    .pipe(sourceMap.init())
    .pipe(plumber())
    .pipe(less({
      globalVars: config.less.globalVars
    }))
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(sourceMap.write('.'))
    .pipe(gulp.dest('dist/css/'));
});


// 压缩js
gulp.task('js', ['clean'], function () {
  return gulp.src('public/js/**/*.js')
    .pipe(sourceMap.init())
    .pipe(eslint({
      configFle: "./.eslintrc"
    }))
    .pipe(eslint.format())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify({
      compress: true
    }))
    .pipe(sourceMap.write('.'))
    .pipe(gulp.dest('dist/js/'));
});

// 非依赖型压缩js
gulp.task('jsInDept', function () {
  return gulp.src('public/js/**/*.js')
    .pipe(eslint({
      configFle: "./.eslintrc"
    }))
    .pipe(eslint.format())
    .pipe(gulp.dest('dist/js/'));
});
// 依赖型js
gulp.task('jsBuildDev', ['clean'], function () {
  return gulp.src('public/js/**/*.js')
    .pipe(eslint({
      configFle: "./.eslintrc"
    }))
    .pipe(eslint.format())
    .pipe(gulp.dest('dist/js/'));
});

// 压缩img
gulp.task('img', ['clean'], function () {
  return gulp.src('public/img/**/*') //引入所有需处理的Img
    //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))      //压缩图片
    // 如果想对变动过的文件进行压缩，则使用下面一句代码
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))) 
    .pipe(gulp.dest('dist/img/'));
  // .pipe(notify({ message: '图片处理完成' }));
});
// 非依赖型压缩img
gulp.task('imgInDept', function () {
  return gulp.src('public/img/**/*') //引入所有需处理的Img
    .pipe(gulp.dest('dist/img/'));
});

// lib原样输出
gulp.task('lib', ['clean'], function () {
  return gulp.src('public/lib/**/*.*')
    .pipe(gulp.dest('dist/lib/'));
});
// 非依赖型lib原样输出
gulp.task('libInDept', function () {
  return gulp.src('public/lib/**/*.*')
    .pipe(gulp.dest('dist/lib/'));
});

// 浏览器同步，用7000端口去代理Express的端口
gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: "http://localhost:" + config.server.port,
    files: ["dist/views/*.*", "dist/css/*.*", "dist/js/*.*", "dist/img/*.*"],
    browser: "default",
    port: config.server.browserSyncPort || 7000
  });
});


/**********************************************start 对已经打包后的ejs、js、css进行进一步的hash打包以避免缓存问题*********************************************************************/
//引入gulp和gulp插件
var runSequence = require('run-sequence');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', ['less'], function () {
  return gulp.src('dist/css/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('dist/css/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/css/'));
});
gulp.task('revEjsCss', ['revCss', 'ejs'], function () {
  return gulp.src(['dist/css/*.json', 'dist/views/*.ejs'])
    .pipe(revCollector()) //替换html中对应的记录
    .pipe(gulp.dest('dist/views/')); //输出到该文件夹中
});
gulp.task('revJs', ['js'], function () {
  return gulp.src('dist/js/**/*.js')
    .pipe(sourceMap.init())
    .pipe(rev()) //给文件添加hash编码
    .pipe(gulp.dest('dist/js/'))
    .pipe(rev.manifest()) //生成rev-mainfest.json文件作为记录
    .pipe(gulp.dest('dist/js/'));
});
//ejs替换css、js文件版本
gulp.task('revEjsJs', ['revJs', 'ejs', 'revEjsCss'], function () {
  return gulp.src(['dist/js/*.json', 'dist/views/*.ejs'])
    .pipe(revCollector())
    .pipe(gulp.dest('dist/views/'));
});
/**********************************************end *******************************************************************************************************************************/

// 开启Express服务
gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'bin/www'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('build', ['clean', 'less', 'ejs', 'js', 'img', 'lib', 'revCss', 'revJs', 'revEjsCss', 'revEjsJs'], function (done) {});
gulp.task('build-dev', ['clean', 'lessBuildDev', 'ejsBuildDev', 'jsBuildDev', 'img', 'lib'], function (done) {});

gulp.task('default', ['browser-sync'], function () {
  // 将你的默认的任务代码放这

  // 监听所有css文档
  gulp.watch('public/less/**/*.less', ['lessInDept']);

  // 监听所有.js档
  gulp.watch('public/js/**/*.js', ['jsInDept']);

  // 监听所有图片档
  gulp.watch('public/img/**/*', ['imgInDept']);
  // 监听lib
  gulp.watch('public/lib/**/*', ['libInDept']);
  // 监听ejs
  gulp.watch('views/**/*.ejs', ['ejsInDept']);

  // 创建实时调整服务器 -- 在项目中未使用注释掉
  var server = livereload();
  // 监听 dist/ 目录下所有文档，有更新时强制浏览器刷新（需要浏览器插件配合或按前文介绍在页面增加JS监听代码）
  gulp.watch(['public/dist/**']).on('change', function (file) {
    server.changed(file.path);
  });
});