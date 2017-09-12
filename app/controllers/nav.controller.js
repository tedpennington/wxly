"use strict";
// having $window injected forces reload of page
app.controller("navCtrl", function ($scope, $window, fbUserFactory, twitterUserFactory, $location) {
	// $scope.searchText = filterFactory;
	$scope.isLoggedIn = false;

  //Initialize OAuth
  twitterUserFactory.initialize();

//When login is clicked, log user into Firebase using Twitter, then log user into Twitter itself.
$scope.login = () => {
    console.log("you clicked on login and login function is running");
    fbUserFactory.authWithProvider()
    .then((result) => {
      let user = result.user.uid;
      $location.path("/home");
      // addUser();
      $scope.$apply();
      console.log("login .then ran");
      twitterUserFactory.connectTwitter()
      .then(function(dataFromConnect) {
            if (twitterUserFactory.isReady()) {
                console.log("connected to Twitter", "dataFromConnect :", dataFromConnect);
                //if the authorization is successful, hide the connect button and display the tweets
                // $('#connectButton').fadeOut(function(){
                //     $('#getTimelineButton, #signOut').fadeIn();
                //     $scope.refreshTimeline();
                //     $scope.connectedTwitter = true;
                // });
            } else {

               }
        });
    })
    .catch((error) => {
      console.log("error with Twitter login");
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("error", error); 
    });
  };

//When logout button is clicked:
	$scope.logout = () => {
        fbUserFactory.logOut();
      };


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.isLoggedIn = true;
      // console.log("currentUser logged in?", user);
      // console.log("logged in t-f", $scope.isLoggedIn );
      $scope.$apply();
    } else {
      $scope.isLoggedIn = false;
      // console.log("user logged in?", $scope.isLoggedIn);
      $window.location.href = "#!/login";
    }
  });	




});