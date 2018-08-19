exports = module.exports = function(grunt, options) {
	var host = 'localhost';

	if (process.env.REMOTE_TESTSERVER_HOST) {
		host = process.env.REMOTE_TESTSERVER_HOST;
	}

	function mapToUrl(files, port) {
		return grunt.file.expand(files).map(function(file) {
			return 'http://' + host + ':' + port + '/' + file;
		});
	}

	return {
		options: options,
		unit: {
			options: {
				logErrors: true,
				log: true,
				urls: [
					'http://' + host + ':<%= connect.test.options.port %>/test/core/',
					'http://' + host + ':<%= connect.test.options.port %>/test/checks/',
					'http://' +
						host +
						':<%= connect.test.options.port %>/test/rule-matches/',
					'http://' + host + ':<%= connect.test.options.port %>/test/commons/',
					'http://' +
						host +
						':<%= connect.test.options.port %>/test/integration/rules/'
				],
				run: true,
				growlOnSuccess: false,
				mocha: {
					grep: grunt.option('grep')
				}
			}
		},
		integration: {
			options: {
				log: true,
				urls: mapToUrl(
					[
						'test/integration/full/**/*.html',
						'!test/integration/full/**/frames/**/*.html',
						// ignore integration tests on cssom related tests
						// until figuring out reason of failure in webdriver
						'!test/integration/full/css-orientation-lock/*.html',
						'!test/integration/full/preload/*.html',
						'!test/integration/full/preload-cssom/*.html'
					],
					'<%= connect.test.options.port %>'
				),
				run: true,
				growlOnSuccess: false,
				mocha: {
					grep: grunt.option('grep')
				}
			}
		}
	};
};
