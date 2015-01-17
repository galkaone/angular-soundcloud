(function() {
    'use strict';

	angular.module('app.tracks')
		.controller('SearchController', SearchController);

		function SearchController ($state, searchFactory) {
			var vm = this;

			vm.search = '';
			vm.tracks = null;
			vm.selectedTrack = null;
			vm.searches = searchFactory.getRecents();

			vm.getTracks = getTracks;
			vm.nextTracks = nextTracks;
			vm.showTrack = showTrack;


			function getTracks () {
				searchFactory.getTracks(vm.search)
					.then(function (tracks) {
						vm.tracks = tracks;
					});
			}

			function nextTracks() {
				searchFactory.getNextTracks(vm.search)
					.then(function (tracks) {
						vm.tracks = tracks;
					});
			}

			function showTrack (trackId) {
				$state.go('play', {trackId: trackId});
			}

		}

})();
