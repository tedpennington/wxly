"use strict";

app.controller("profileCtrl", function ($scope, fbUserFactory, $location, $window, $routeParams, $route){

	
	// fbUserFactory.isAuthenticated();
	// fbUserFactory.getCurrentUser();
	// console.log("fbUserFactory.getCurrentUser()", fbUserFactory.getCurrentUser());

	//isAuthenticated gets run to set currentUser so it can be used below
	
	$scope.populateProfile = function() {
		console.log("populateProfile ran");
		fbUserFactory.isAuthenticated()
		.then((isAuth) => {
			//Get current user full object from firebase based on firebase auth id
			fbUserFactory.getCurrentUserFullObj(fbUserFactory.getFirebaseId())
			.then((userObj) => {
				console.log("userObj", userObj);
				console.log("photoURL", userObj.photoURL);
				$scope.userName = userObj.displayName;
				$scope.photoURL = userObj.photoURL;
				$scope.email = userObj.email;
				$scope.skywarn = userObj.skywarn;
				$scope.county = userObj.county;
				switch(userObj.county) {
					case "%40nashseverewx":
						$scope.countyName = "Davidson/Williamson";
						break;
					case "40bedfordseverewx":
						$scope.countyName = "Bedford";
						break;
					case "%40cheathmseverewx":
						$scope.countyName = "Cheatham";
						break;
					case "%40coffeeseverewx":
						$scope.countyName = "Coffee";
						break;
					case "%40dicksonseverewx":
						$scope.countyName = "Dickson";
						break;
					case "%40hickmanseverewx":
						$scope.countyName = "Hickman";
						break;
					case "%40lawrencesvrewx":
						$scope.countyName = "Lawrence";
						break;
					case "%40maconseverewx":
						$scope.countyName = "Macon";
						break;
					case "%40marshseverewx":
						$scope.countyName = "Marshall";
						break;
					case "%40mauryseverewx":
						$scope.countyName = "Maury";
						break;
					case "%40montcoseverewx":
						$scope.countyName = "Montgomery";
						break;
					case "%40overtonseverewx":
						$scope.countyName = "Overton";
						break;
					case "%40putnamseverewx":
						$scope.countyName = "Putnam";
						break;
					case "%40robcoseverewx":
						$scope.countyName = "Robertson";
						break;
					case "%40ruthseverewx":
						$scope.countyName = "Rutherford";
						break;
					case "%40smithcountywx":
						$scope.countyName = "Smith";
						break;
					case "%40sumnerseverewx":
						$scope.countyName = "Sumner";
						break;
					case "%40trousdalewx":
						$scope.countyName = "Trousdale";
						break;
					case "%40wilsonseverewx":
						$scope.countyName = "Wilson";
						break;
					
				}
				$scope.uglyID = userObj.uglyID;
				switch(userObj.roleValue) {
					case 10: 
						$scope.roleName = "Guest";
						break;
					case 20: 
						$scope.roleName = "User";
						break;
					case 30: 
						$scope.roleName = "Moderator";
						break;
					case 40: 
						$scope.roleName = "Administrator";
						break;
					case 50: 
						$scope.roleName = "Super-Admin";
						break;
				}

			});
		});
	};

	// Populate profile when page loads
	$scope.populateProfile();

	// Runs when form is submitted
	$scope.submitProfile = function() {
		let userObj = {
			email: $scope.email,
			skywarn: $scope.skywarn,
			county: $scope.county
		};
		fbUserFactory.editUser($scope.uglyID, userObj)
		.then(() => {
			toastr.success("Your profile was saved!", "Profile Saved");
		$window.location.href = "#!/profile";
		});
		

	};
	



});