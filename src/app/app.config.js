(function() {
    'use strict';

	angular.module('app')
		.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

			$locationProvider.html5Mode(true);
			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('search', {
					url: '/',
					templateUrl: 'app/tracks/search.html',
					controller: 'SearchController',
					controllerAs: 'vm'
				})
				.state('play', {
					url: '/play/:trackId',
					templateUrl: 'app/tracks/play.html',
					controller: 'PlayController',
					controllerAs: 'vm'
					// ,resolve: {
					// 	track: function ($stateParams, SC) {
					// 		var trackId = $stateParams.trackId;
					// 		return SC.getTrackInfo(trackId);
					// 	}
					// }
				});

		});

})();
