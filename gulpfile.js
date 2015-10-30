// modules > 3rd party
global._ = require('lodash');
var requireDir = require('require-dir');

// modules > gulp
var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var chalk = require('chalk');

global.ENV = process.env.NODE_ENV || 'development';
global.PWD = process.env.PWD;

var config = require('./config');

// set up gulp helper functions
gulp.mkdir = require('./util/mkdir');
gulp.timer = require('./util/timer');
gulp.logger = require('./util/logger');
gulp.errorHandler = require('./util/error-handler');

// set the gulp dir root
gulp.dir = __dirname;

// require ALL js files in the task directory recursively
var obj = requireDir('./tasks');

if(ENV === 'development')
	_.extend(obj, requireDir('./tasks/development'));

	if(process.env.INIT_CWD) {
		process.chdir(process.env.INIT_CWD);
		gutil.log('Working directory changed (BACK) to' + chalk.magenta(process.cwd()));
	}
// since all task files should return a function
// that takes the gulp instance and the config as parameters,
// all functions on the `obj` are called.
for(var p in obj) {
	obj[p](gulp, config);
}

// sets up all tasks fr[m config.tasks using runSequence, usually only the
// 'default' task
_.each(config.tasks, function(subTasks, name) {
	gulp.task(name, function(callback) {
		var tasks = subTasks.slice(0);
		tasks.push(callback);
		runSequence.apply(null, tasks);
	});
});
