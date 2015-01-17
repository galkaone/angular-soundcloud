(function() {
    'use strict';

	angular.module('app.tracks')
		.controller('PlayController', PlayController);

		function PlayController ($stateParams) {
			var vm = this;

			vm.trackId = $stateParams.trackId;
		}

})();
