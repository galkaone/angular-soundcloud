(function() {
	'use strict';

	angular.module('app.components', ['app.core'])
		.directive('scStreamer', scStreamer);

		function scStreamer () {
			return {
				scope: {
					trackId: '@'
				},
				replace: true,
				restrict: 'E',
				templateUrl: 'app/components/streamer.html',
				controller: PlayerControler,
				controllerAs: 'vm',
				bindToController: true
			};
		}

		function PlayerControler (SC) {
			var vm = this;

			vm.playing = false;

			vm.play = play;

			activate();

			////////

			function activate() {
				SC.getTrackInfo(vm.trackId)
					.then(prepareTrack
					,function (errors) {
						console.log(errors);
					});
			}

			function prepareTrack (track) {
				/*jshint camelcase: false */
			 	/* global Audio */
				vm.title = track.title;
				vm.albumArt = track.artwork_url ? track.artwork_url.replace('large', 't500x500') : '';
				vm.wave = track.waveform_url;
				vm.stream = track.stream_url + '?client_id=' + SC.getClientId();
				vm.song = new Audio();
			}

			function play () {
				vm.playing = !vm.playing;

				if (!vm.playing) {
					vm.song.pause();
				} else {
					if(vm.song.src === '') {
						vm.song.src = vm.stream;
					}
					vm.song.play();
				}
			}
		}

})();
