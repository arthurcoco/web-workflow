var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyHTML= require('gulp-minify-html');
var minifyJSON= require('gulp-jsonminify');
var imagemin = require('gulp-imagemin')
var pngcrush = require('imagemin-pngcrush')

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
// env = 'development';

if (env === 'development'){
	outputDir = 'builds/development/';
	sassStyle = "expanded";
}else{
	outputDir = 'builds/production/';
	sassStyle = "compressed";
}


// SRCS
coffeeSources = ['components/coffee/*.coffee'];

jsSources = [
	'components/scripts/test.js',
	'components/scripts/myscript.js'
];

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

gulp.task('log',function(){
	gutil.log('Work!');
});

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
		.pipe(coffee({bare: true})
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: outputDir +'images',
			style: sassStyle,
			require: 'bootstrap-sass'
		})
			.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(connect.reload())
});



gulp.task('html', function(){
	gulp.src('builds/development/*.html')
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});


gulp.task('json', function(){
	gulp.src('builds/development/json/*.json')
		.pipe(gulpif(env === 'production', minifyJSON()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir+'json')))
		.pipe(connect.reload())
});


gulp.task('images', function(){
	// any images in any sub-folders
	gulp.src('builds/development/images/**/*.*') 
		.pipe(gulpif(env === 'production', imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngcrush()]
		})))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir+'images')))
		.pipe(connect.reload())
});







// Watch
gulp.task('watch', function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['html']);
	gulp.watch('builds/development/json/*.json', ['json']);
	gulp.watch('builds/development/images/**/*.*', ['images']);
});



// connect
gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereload: true
	});
});


// Default Task

gulp.task('default', ['html', 'json', 'images', 'coffee', 'js', 'compass', 'connect', 'watch' ]);


