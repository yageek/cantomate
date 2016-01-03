(function(){

	angular.module('Cantomate',['ngMaterial'])
  .controller('BankListController', ['$log',
  BankListController
]);


  function BankListController($log){
    var self = this;
    self.banks = ['Bank1', 'Bank2'];
  };
})();
