// modules > native
var p = require('path');

// modules > 3rd party
var chalk = require('chalk');

// modules > gulp:utilities
var gutil = require('gulp-util');

// modules > gulp:plugins
var symlink = require('gulp-symlink');

var TASK_NAME = 'fonts';

module.exports = function(gulp, config) {
	config = config.fonts || config;

	gulp.task(TASK_NAME, function() {
		var count = 0;

		gulp.src(config.src)
			.on('end', function() {
				gutil.log(chalk.cyan(TASK_NAME) + ' done symlinking ' + chalk.bold.blue(count) + ' files');
			})
			.pipe(symlink(function(file) {
				count++;
				return path.join(config.dest, file.relative);
			}));
	});
};
