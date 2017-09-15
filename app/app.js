"use strict";
// check ngSanitize spelling etc.
const app = angular.module("WXly", ["ngRoute", "ngSanitize"]);

let isAuth = (userFactory) => new Promise ( (resolve, reject) => {
  console.log("userFactory is", userFactory);
  userFactory.isAuthenticated()
  .then( (userExists) => {
    if(userExists){
      console.log("Authenticated, go ahead");
      resolve();
    }else {
      console.log("Authentication reject, GO AWAY");
      reject();
    }
  });
});



app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'homeCtrl'
		// resolve: {isAuth}
	})
	// .when('/login',{
	// 	templateUrl: 'partials/user.html',
	// 	controller: 'userCtrl'
	// })
	.when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'homeCtrl'//,
		// resolve: {isAuth}
	})
	.when('/profile', {
		templateUrl: 'partials/profile.html',
		controller: 'profileCtrl'//,
		// resolve: {isAuth}
	})
	.when('/edit-profile', {
		templateUrl: 'partials/edit-profile.html',
		controller: 'profileCtrl'//,
		// resolve: {isAuth}
	})
	// .when('/addboard', {
	// 	templateUrl: 'partials/form-board.html',
	// 	controller: 'addBoardCtrl',
	// 	resolve: {isAuth}
	// })
	// .when('/pin/:itemId', {
	// 	templateUrl: 'partials/pin-detail.html',
	// 	controller: 'pinDetailCtrl',
	// 	resolve: {isAuth}
	// })
	// .when('/task/:itemId/edit', {
	// 	templateUrl: 'partials/form.html',
	// 	controller: 'editTaskCtrl',
	// 	resolve: {isAuth}
	// })
	.otherwise('/');
});


app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain,
		databaseURL: creds.databaseURL
	};

	firebase.initializeApp(authConfig);
});

// This wasn't used in manterest:
// // example of $rootScope
// app.run(function($rootScope){
// 	$rootScope.showSearch = false;
// });

