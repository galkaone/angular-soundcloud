(function() {
	'use strict';

	angular
		.module('app.tracks')
		.factory('searchFactory', searchFactory);

	function searchFactory ($q, SC, localStorageService) {

		var offsetTracks = 0,
			numTracks = 6,
			lastKeyword = '',
			showTiles = localStorageService.get('sc-searches-tiles') || false,
			searches = localStorageService.get('sc-searches') || [];

		var factory = {
			getNextTracks: getNextTracks,
			getTracks: getTracks,
			getRecents: getRecents,
			getShowTiles: getShowTiles,
			setShowTiles: setShowTiles
		};

		return factory;

		/////////

		function getTracks (search, offset) {
			var deferred = $q.defer();

			// fair enough for basic validation :)
			if (!search) {
				deferred.reject({error: 'missing search key'});
				return deferred.promise;
			}


			offset = offset || 0;

			SC.getTracks(search, numTracks, offset)
				.then(function (tracks) {
					lastKeyword = search;

					saveRecentSearches(lastKeyword);

					for(var i = 0; tracks.length > i; i++) {
						tracks[i].artwork_url = tracks[i].artwork_url ? tracks[i].artwork_url.replace('large', 'small') : '';
					}

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
			return searches.slice().reverse();
		}


		function saveRecentSearches (key) {
			var maxSaves = 5;
			// if (searches.indexOf(key) === -1) {

			searches.push(key);

			if(searches.length > maxSaves) {
				searches.splice(0 , searches.length - maxSaves);
			}

			localStorageService.set('sc-searches', searches);

			// }

		}

		function getShowTiles () {
			return showTiles;
		}

		function setShowTiles (display) {
			showTiles = !!display;
			localStorageService.set('sc-searches-tiles', showTiles);
		}


	}

})();
