angular.module('mll.controllers', [])

  .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout, $ionicPlatform, $localStorage, AuthFactory) {

    // Form data for the login modal
    // Form data for the login modal
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    $scope.loggedIn = false;

    if(AuthFactory.isAuthenticated()) {
      $scope.loggedIn = true;
      $scope.username = AuthFactory.getUsername();
    }

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
      $localStorage.storeObject('userinfo',$scope.loginData);

      AuthFactory.login($scope.loginData);

      $scope.closeLogin();
    };

    $scope.logOut = function() {
      AuthFactory.logout();
      $scope.loggedIn = false;
      $scope.username = '';
    };

    $rootScope.$on('login:Successful', function () {
      $scope.loggedIn = AuthFactory.isAuthenticated();
      $scope.username = AuthFactory.getUsername();
    });

    // REGISTRATION

    $scope.registration = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.registerform = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeRegister = function () {
      $scope.registerform.hide();
    };

    // Open the login modal
    $scope.register = function () {
      $scope.registerform.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doRegister = function () {
      console.log('Doing registration', $scope.registration);
      $scope.loginData.username = $scope.registration.username;
      $scope.loginData.password = $scope.registration.password;

      AuthFactory.register($scope.registration);
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeRegister();
      }, 1000);
    };

    $rootScope.$on('registration:Successful', function () {
      $scope.loggedIn = AuthFactory.isAuthenticated();
      $scope.username = AuthFactory.getUsername();
      $localStorage.storeObject('userinfo',$scope.loginData);
    });



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

  .controller('BookController', ['$scope', '$state', 'userBook', 'myBooksFactory', 'baseURL', function ($scope, $state, userBook, myBooksFactory, baseURL) {
    $scope.baseURL = baseURL;
    $scope.message = "Loading ...";

    $scope.userBook = userBook;

    $scope.SaveReview = function () {

      myBooksFactory.update({_id: $scope.userBook.id}, $scope.userBook, function () {
        $state.transitionTo('app.mybooks', {}, {reload: true, inherit: true, notify: true});//reload
      });

    }

  }])

  .controller('SearchController', ['$scope', '$stateParams', '$ionicListDelegate',
    '$ionicPlatform', '$cordovaLocalNotification', 'baseURL', 'booksFactory', 'myBooksFactory',  'books',
    function ($scope, $stateParams, $ionicListDelegate,
              $ionicPlatform, $cordovaLocalNotification, baseURL, booksFactory, myBooksFactory, books) {

      $scope.baseURL = baseURL;
      $scope.message = "Loading ...";
      $scope.books = books;
      $scope.innerFilter = $stateParams.filter;

      $scope.filterText;


      $scope.addBook = function (index) {

        myBooksFactory.save({book : books[index]._id });

        $ionicListDelegate.closeOptionButtons();

        $ionicPlatform.ready(function () {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: "Added book to my bookshelf.",
            text: $scope.books[index].name
          }).then(function () {
            console.log('Added book ' + $scope.books[index].name + ' to my bookshelf.');
          }, function () {
            console.log('Failed to add Notification ');
          });
        });

      };

    }]);
