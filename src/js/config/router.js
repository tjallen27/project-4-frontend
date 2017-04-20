angular
  .module('Kuler')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/static/home.html'
    })
    .state('printsIndex', {
      url: '/prints',
      templateUrl: 'js/views/prints/index.html',
      controller: 'PrintsIndexCtrl as printsIndex'
    })
    .state('printsNew', {
      url: '/prints/new',
      templateUrl: 'js/views/prints/new.html',
      controller: 'PrintsNewCtrl as printsNew'
    })
    .state('printsShow', {
      url: '/prints/:id',
      templateUrl: 'js/views/prints/show.html',
      controller: 'PrintsShowCtrl as printsShow'
    })
    .state('printsEdit', {
      url: '/prints/:id/edit',
      templateUrl: 'js/views/prints/edit.html',
      controller: 'PrintsEditCtrl as printsEdit'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'AuthCtrl as auth'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'AuthCtrl as auth'
    });

  $urlRouterProvider.otherwise('/');
}
