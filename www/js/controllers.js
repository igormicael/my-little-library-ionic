angular.module('mll.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('IndexController', ['$scope', 'baseURL', function ($scope, baseURL) {

    $scope.baseURL = baseURL;
    $scope.message = "Loading ...";
  }])

  .controller('MyBooksController', ['$scope', 'mybooks', 'myBooksFactory', 'baseURL', function ($scope, mybooks, myBooksFactory, baseURL) {

    $scope.baseURL = baseURL;
    $scope.message = "Loading ...";

    $scope.filterText = 'READ';
    $scope.tab = 1;
    $scope.mybooks = mybooks;

    $scope.select = function (setTab) {
      $scope.tab = setTab;

      if (setTab === 1) {
        $scope.filterText = "READ";
      } else if (setTab === 2) {
        $scope.filterText = "READING";
      } else if (setTab === 3) {
        $scope.filterText = "RE-READING";
      } else if (setTab === 4) {
        $scope.filterText = "ABANDONED";
      }
    };

    $scope.isSelected = function (checkTab) {
      return ($scope.tab === checkTab);
    };

  }])

  .controller('BookController', ['$scope','$state', 'userBook', 'myBooksFactory', 'baseURL', function ($scope, $state,  userBook, myBooksFactory, baseURL) {
    $scope.baseURL = baseURL;
    $scope.message = "Loading ...";

    $scope.userBook = userBook;

    $scope.SaveReview = function() {

      myBooksFactory.update({_id: $scope.userBook.id }, $scope.userBook, function(){
        $state.transitionTo('app.mybooks', {}, { reload: true, inherit: true, notify: true });//reload
      });

    }

  }])

  .controller('NewBooksController', ['$scope', 'baseURL', function ($scope, baseURL) {

    $scope.baseURL = baseURL;
    $scope.message = "Loading ...";
  }])

;
