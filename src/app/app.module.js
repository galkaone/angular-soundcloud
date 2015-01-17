(function() {
    'use strict';

	angular.module('app', [
		// angular modules
		'ngAnimate',
		'ngCookies',
		'ngTouch',
		'ngSanitize',

		// app modules
		'app.tracks',

		// vendor modules
		'ui.router',
		'ui.bootstrap',
		'LocalStorageModule'
	]);

})();
