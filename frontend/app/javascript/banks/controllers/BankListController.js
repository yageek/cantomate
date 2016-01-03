(function(){

	angular.module('cantomateApp',['ngMaterial'])
  .controller('BankListController', ['$log',
  BankListController
]);


  function BankListController($log){
    var self = this;
    self.banks = ['Bank1', 'Bank2', 'Bank3'];
  };
})();
