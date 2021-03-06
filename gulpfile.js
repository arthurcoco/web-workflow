var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyJSON = require('gulp-jsonminify');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin')
var pngcrush = require('imagemin-pngcrush')
var uglifyCSS = require('gulp-uglifycss');
var stripCssComments = require('gulp-strip-css-comments');


var env,
    coffeeSources,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';

// env = 'production';

if (env === 'development') {
    outputDir = 'builds/development/';
    sassStyle = "expanded";
} else {
    outputDir = 'builds/production/';
    sassStyle = "compressed";
}


// SRCS
coffeeSources = ['components/coffee/*.coffee'];

jsSources = [
    'components/scripts/jquery-1.11.3.min.js',
    'components/scripts/jquery.easings.min.js',
    'components/scripts/jquery.slimscroll.min.js',
    'components/scripts/jquery.fullPage.min.js',
    'components/scripts/bootstrap.min.js',
    'components/scripts/script.js'
];

cssSources = [
    'components/css/font-awesome.min.css',
    'components/css/bootstrap.min.css',
    'components/css/jquery.fullPage.css'
];

// headJsSources = [
//     'components/scripts/head/jquery-1.11.3.min.js',
//     'components/scripts/head/jquery.easings.min.js',
//     'components/scripts/head/jquery.slimscroll.min.js',
//     'components/scripts/head/jquery.fullPage.min.js',
//     'components/scripts/head/bootstrap.min.js'

// ]
sassSources = [
    'components/sass/style.scss'
];

htmlSources = [
    outputDir + '*.html'
];

jsonSources = [
    outputDir + 'json/*.json'
];


// =============

gulp.task('log', function() {
    gutil.log('Work!');
});

gulp.task('coffee', function() {
    gulp.src(coffeeSources)
        .pipe(coffee({
                bare: true
            })
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        // .pipe(browserify()
        //     .on('error', gutil.log))
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});


gulp.task('css', function() {
    gulp.src(cssSources)
    .pipe(gulpif(env === 'production', stripCssComments()))
    .pipe(gulpif(env === 'production', minifyCSS()))
    // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))

        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload())
});


// gulp.task('headJs', function() {
//     gulp.src(headJsSources)
//         .pipe(concat('headscript.js'))
//         // .pipe(browserify()
//         // 	.on('error', gutil.log))
//         .pipe(gulpif(env === 'production', uglify()))
//         .pipe(gulp.dest(outputDir + 'js'))
//         .pipe(connect.reload())
// });


gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
                sass: 'components/sass',
                image: outputDir + 'images',
                style: sassStyle,
                require: ['font-awesome-sass', 'bootstrap-sass']
            })
            .on('error', gutil.log))
        .pipe(gulpif(env === 'production', minifyCSS()))
        .pipe(gulpif(env === 'production', stripCssComments()))
    	.pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload())
});




gulp.task('html', function() {
    gulp.src('builds/development/*.html')
        .pipe(gulpif(env === 'production', minifyHTML()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload())
});


gulp.task('json', function() {
    gulp.src('builds/development/json/*.json')
        .pipe(gulpif(env === 'production', minifyJSON()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'json')))
        .pipe(connect.reload())
});


gulp.task('images', function() {
    // any images in any sub-folders
    gulp.src('builds/development/images/**/*.*')
        .pipe(gulpif(env === 'production', imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngcrush()]
        })))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
        .pipe(connect.reload())
});

gulp.task('fonts', function() {
    // any images in any sub-folders
    gulp.src('builds/development/fonts/*.*')
        .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'fonts')))
        .pipe(connect.reload())
});
gulp.task('video', function() {
    // any images in any sub-folders
    gulp.src('builds/development/video/*.*')
        .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'video')))
        .pipe(connect.reload())
});







// Watch
gulp.task('watch', function() {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(cssSources, ['css']);
    // gulp.watch(headJsSources, ['headJs']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch('builds/development/*.html', ['html']);
    gulp.watch('builds/development/json/*.json', ['json']);
    gulp.watch('builds/development/images/**/*.*', ['images']);
    gulp.watch('builds/development/video/*.*', ['video']);
    gulp.watch('builds/development/fonts/*.*', ['fonts']);
});



// connect
gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
    });
});


// Default Task

gulp.task('default', ['html', 'css', 'json', 'images', 'fonts', 'video', 'coffee', 'js', 'compass', 'connect', 'watch']);
