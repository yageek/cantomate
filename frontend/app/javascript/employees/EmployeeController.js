(function(){
		
	angular
		.module('employees')
		.controller('EmployeeController', [
			'$log', '$mdSidenav', '$mdBottomSheet','employeeService', 
			EmployeeController
		]);
	
	
  /**
   * Main employee controller
   * 
   * @param   $log
   * @param  employeeServices
   */
  function EmployeeController($log, $mdSidenav, $mdBottomSheet, employeeService) {
	  var self = this;
	  
	  self.selected = null;
	  self.employees = [];
	  
	  self.selectEmployee = selectEmployee;
	  self.toggleUsersList = toggleUsersList;
    self.share = share;
	  
	  // Load all the users
	  employeeService
	  	.loadAllEmployees().then(function(employees){
			  
			  self.employees = [].concat(employees);
			  self.selected = employees[0];
			  
		  });
    
	
	function toggleUsersList() {
      $mdSidenav('left').toggle();
    }
	
	function selectEmployee( employee ) {
		self.selected = angular.isNumber(employee) ? self.employees[employee] : employee;
		self.toggleUsersList();
	}
	
	/**
     * Show the bottom sheet
     */
    function share($event) {
        var user = self.selected;

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: './src/users/view/contactSheet.html',
          controller: [ '$mdBottomSheet', UserSheetController],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function UserSheetController( $mdBottomSheet ) {
          this.user = user;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }
 }
  
 
})();