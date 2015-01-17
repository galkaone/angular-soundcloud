(function() {
	'use strict';

	angular
		.module('app.tracks')
		.factory('searchFactory', searchFactory);

	function searchFactory (SC, localStorageService, $q) {

		var offsetTracks = 0,
			numTracks = 6,
			lastKeyword = '',
			searches = localStorageService.get('sc-searches') || [];

		var factory = {
			getNextTracks: getNextTracks,
			getTracks: getTracks,
			getRecents: getRecents
		};

		return factory;

		/////////

		function getTracks (search, offset) {
			var deferred = $q.defer();

			// fair enough for basic validation :)
			if (typeof search === 'undefined') {
				deferred.reject({error: 'missing search key'});
				return deferred.promise;
			}


			offset = offset || 0;

			SC.getTracks(search, numTracks, offset)
				.then(function (tracks) {
					lastKeyword = search;

					saveRecentSearches(lastKeyword);

					deferred.resolve(tracks);
				},
				function (errors) {
					console.log('got an error', errors);
					deferred.reject(errors);
				});

			return deferred.promise;
		}

		function getNextTracks (search) {
			if (lastKeyword === search) {
				offsetTracks += numTracks;
			}else {
				offsetTracks = 0;
			}

			return getTracks(search, offsetTracks);
		}

		function getRecents () {
			return searches;
		}


		function saveRecentSearches(key) {
			// add logic to recent searches
			searches.push(key);
			// save
			localStorageService.set('sc-searches', searches);

		}

	}

})();
