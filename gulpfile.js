var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');


// SRCS
var coffeeSources = ['components/coffee/*.coffee']

gulp.task('log',function(){
	gutil.log('Work!');
});

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
		.pipe(coffee({bare: true})
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'))
});