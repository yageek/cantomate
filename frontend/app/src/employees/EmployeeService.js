(function(){
	
	angular.module('employees').service('employeeService',['$q', EmployeeService]);
	
	
	function EmployeeService($q){
		var employees = 
		[
			{
				name: 'Lia Lugo',
				avatar: 'avatar-1',
				content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
			},
			{
				name: 'George Duke',
				avatar: 'avatar-1',
				content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
			}
		];
		
		 // Promise-based API
    return {
      loadAllEmployees : function() {
        // Simulate async nature of real remote calls
        return $q.when(employees);
      }
    };			
}	
	
})();