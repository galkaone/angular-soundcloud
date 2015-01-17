(function() {
    'use strict';

	angular.module('app.tracks')
		.run(runBlock);

		function runBlock(SC) {
			SC.initialize();
		}

})();
