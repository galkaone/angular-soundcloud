(function() {
	'use strict';

	angular
		.module('gk.soundcloud', [])
		.factory('SC', scFactory);

	/* global SC */
	function scFactory ($q) {

		var clientId = 'd652006c469530a4a7d6184b18e16c81';

		var factory = {
			initialize: initialize,
			getTracks: getTracks,
			getTrackInfo: getTrackInfo,
			getClientId: getClientId
		};

		return factory;

		/////////

		function initialize () {

			if (typeof SC !== 'undefined') {
				SC.initialize({
					client_id: clientId
				});
			} else {
				console.log('SC is undefined');
			}
		}

		function getTracks (key, limit, offset) {
			var deferred = $q.defer();

			limit = limit || 6;
			offset = offset || 0;

			SC.get('/tracks', { q: key, limit: limit, offset: offset }, function(tracks) {

				if (tracks.errors) {
					deferred.reject(tracks.errors);
				}
				deferred.resolve(tracks);
			});

			return deferred.promise;
		}

		function getTrackInfo (trackId) {
			var deferred = $q.defer();

			if (!trackId) {
				deferred.reject('missing track id');
			}

			SC.get('/tracks/' + trackId, function(track) {

				if (track.errors) {
					deferred.reject(track.errors);
				}
				deferred.resolve(track);
			});

			return deferred.promise;
		}

		function getClientId () {
			return clientId;
		}

	}

})();
