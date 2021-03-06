app.controller('scheduleController', function(sessionFactory, employeeFactory, scheduleFactory, shiftFactory,socket, $location) {
	var _this = this;
	sessionFactory.getUser(function(currentUser){
		_this.currentUserData = currentUser;
		if(sessionFactory.checkUser() == undefined) {
			$location.path('/');
		}

		scheduleFactory.getMySchedule(_this.currentUserData.id, function(response){
			if (_this.currentUserData.user_level == 1) {
				_this.mySchedule = response;
			} 
		})
		socket.on('update_schedule', function(){
			scheduleFactory.getMySchedule(_this.currentUserData.id, function(response){
				if (_this.currentUserData.user_level == 1) {
					console.log(response)
					_this.mySchedule = response;
					shiftFactory.getAllShift(function(response){
						_this.availableShift = response;
						console.log(response);
					})
				} else {
					console.log('Administrators do not have schedules. They work when they want.')
				}
			})
		})

		shiftFactory.getAllShift(function(response){
			_this.availableShift = response;
		})
	})

	_this.takeShift = function(shift){
		var selected = {id: _this.currentUserData.id}
		shift.selected = selected; 
		shiftFactory.assign(shift, function(response){
			socket.emit("shift_taken")
			scheduleFactory.getMySchedule(_this.currentUserData.id, function(response){
				if (_this.currentUserData.user_level == 1) {
					_this.mySchedule = response;
				} 
			})

			shiftFactory.getAllShift(function(response){
				_this.availableShift = response;
			})
		})
	}	

	_this.giveShift = function(shift){
		var selected = {id: _this.currentUserData.id}
		shift.selected = selected; 
		shiftFactory.unassign(shift, function(response){
			socket.emit("take_time_off")
			scheduleFactory.getMySchedule(_this.currentUserData.id, function(response){
				if (_this.currentUserData.user_level == 1) {
					_this.mySchedule = response;
				} 
			})

			shiftFactory.getAllShift(function(response){
				_this.availableShift = response;
			})
		})
	}
});