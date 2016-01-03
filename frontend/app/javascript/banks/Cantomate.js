function startApp(){
	window.init();
}

(function(){
	angular.module('cantomateApp',['ngMaterial']).run(function($log, $window){
		$log.debug("Starting Cantomate application...");

		//Define starting application
		$window.init = function(){

			$log.debug("Initialize Cloud Endpoints...");
			loadBankService($log);
		};
	});

var ROOT = "http://localhost:8080/_ah/api";

	function loadBankService($log){
		$log.debug("Loading Bank services...");
		gapi.client.load('banks', 'v1', function() {
			$log.debug("Bank services OK");
		}, ROOT);

	};

})();
