var path = require('path');
var symlink = require('gulp-symlink');

module.exports = function(gulp, config) {
	config = config.fonts || config;
	gulp.task('fonts', function() {
		gulp.src(config.src).pipe(symlink(function(file) {
			return path.join(config.dest, file.relative);
		}));
	});
};