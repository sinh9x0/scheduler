app.factory('shiftFactory', function($http){
	var factory = {};

	factory.getCategories = function(callback){
		$http.get('/getCategories').success(function(categories){
			callback(categories);
		});
	}

	factory.addShift = function(shift, callback){
		$http.post('/addShift', shift).success(function(response){
			callback(response);
		});	
	}
	
	factory.getAllShift = function(callback){
		$http.get('/getAllShift').success(function(response){
			callback(response);
		})
	}

	factory.getAllEmployees = function(shift, index, callback){
		$http.post('/getAllEmployees', shift).success(function(workers){
			callback(workers, index);
		})
	}

	factory.assign = function(shift, callback){
		$http.post('/assign', shift).success(function(response){
			callback(response);
		})
	}

	factory.unassign = function(shift, callback){
		$http.post('/unassign', shift).success(function(response){
			callback(response);
		})
	}

	return factory;
})