app.controller('adminLoginController', function(sessionFactory, adminFactory, $location) {
	var _this = this;
	_this.invalid = false;
	sessionFactory.getErrors(function(response){
		_this.sessionErrors = response;
	})

	sessionFactory.getLogOutMessage(function(response){
		_this.logoutMessage = response;
	})

	sessionFactory.getUser(function(currentUser){
		if (currentUser) {
			if (currentUser.user_level == 9) {
				$location.path('/admin/dashboard')
			} else {
				$location.path('/dashboard')
			}
		} 
	});

	_this.login = function(){
		adminFactory.authenticate(_this.user, function(sessionUser){
			if(sessionUser.errors != undefined){
				_this.sessionErrors = sessionUser.errors;
				_this.invalid = true;
			} else {				
				sessionFactory.getUser(function(sUser){
					_this.currentUser = sUser;
				}); 

				_this.invalid = false;
				_this.user = {};
				$location.path('/admin/dashboard');
			}
		});
	}

	_this.currentUser = {};
});