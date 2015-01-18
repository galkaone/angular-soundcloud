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
			vm.isSearching = false;

			vm.getTracks = getTracks;
			vm.nextTracks = nextTracks;
			vm.showTrack = showTrack;
			vm.showRecentSearch = showRecentSearch;


			function getTracks () {
				searchFactory.getTracks(vm.search)
					.then(function (tracks) {
						vm.tracks = tracks;
						vm.isSearching = true;
					});
			}

			function nextTracks () {
				searchFactory.getNextTracks(vm.search)
					.then(function (tracks) {
						vm.tracks = tracks;
						vm.isSearching = true;
					});
			}

			function showTrack (trackId) {
				$state.go('play', {trackId: trackId});
			}

			function showRecentSearch (key) {
				vm.search = key;
				getTracks();
			}

		}

})();
