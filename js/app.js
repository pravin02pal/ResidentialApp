var app=angular.module('residentialapp',['ngRoute','toaster','ngAnimate','ngQuickDate','ui.bootstrap','ngProgress']);
app.value("url", "http://pravinpal.herokuapp.com/");
app.config(function($routeProvider){
      $routeProvider
          .when('/home',{
                templateUrl: 'templates/home.html',
                controller: "userCtrl"    
          })
          .when('/signin',{
                templateUrl: 'templates/signin.html',
                controller: "userCtrl"
          })
	     .when('/user/:full_name/add',{
                templateUrl: 'templates/users_list.html',
                controller: "userCtrl",
                resolve: isLogged = true
          })
          .when('/user/:name/logout',{
                templateUrl: 'templates/home.html',
                controller: "userCtrl",
                resolve: isLogged = true
          })
          .when('/addUser',{
                templateUrl: 'templates/add_user.html',
                controller: "userCtrl",
                resolve: isLogged = true
          })
          .when('/user/:id/edit',{
                templateUrl: 'templates/edit_profile.html',
                controller: "userCtrl",
                resolve: isLogged = true
          })
          .when('/room/:id/edit',{
                templateUrl: 'templates/edit_room.html',
                controller: "roomCtrl",
                resolve: isLogged = true
          })
          .when('/roomsList',{
                templateUrl: 'templates/rooms_list.html',
                controller: "roomCtrl",
                resolve: isLogged = true
          })
          .when('/room/:id/deleted',{
                templateUrl: 'templates/rooms_list.html',
                controller: "roomCtrl",
                resolve: isLogged = true
          })
          .when('/room/:id/updated',{
                templateUrl: 'templates/rooms_list.html',
                controller: "roomCtrl",
                resolve: isLogged = true
          })
          .when('/room/:id/created',{
                templateUrl: 'templates/rooms_list.html',
                controller: "roomCtrl",
                resolve: isLogged = true
          })
          .when('/createRoom',{
                templateUrl: 'templates/create_room.html',
                controller: "roomCtrl",
                resolve: isLogged = true
          })
          .when('/assign/:name/room',{
                templateUrl: 'templates/assign_room.html',
                controller: "roomCtrl",
                resolve: isLogged = true
          })
          .when('/assignRoom',{
                templateUrl: 'templates/assign_room.html',
                controller: "roomCtrl",
                resolve: isLogged = true
          })
          .when('/welcome',{
                templateUrl: 'templates/welcome.html',
                controller: "userCtrl",
                resolve: isLogged = true
          })
          .when('/usersList',{
                templateUrl: 'templates/users_list.html',
                controller: "userCtrl",
                resolve: isLogged = true
		  })
		  .when('/user/:id/deleted',{
                templateUrl: 'templates/users_list.html',
                controller: "userCtrl",
                resolve: isLogged = true
		  })
		  .when('/room/:id/cancel',{
                templateUrl: 'templates/users_list.html',
                controller: "userCtrl",
                resolve: isLogged = true
		  })
		   .when('/user_name/:name/room_id/:id/allotted',{
                templateUrl: 'templates/users_list.html',
                controller: "userCtrl",
                resolve: isLogged = true
		  })
		  .when('/user/:id/updated',{
                templateUrl: 'templates/users_list.html',
                controller: "userCtrl",
                resolve: isLogged = true
		  })
		  .when('/addMeterReading',{
                templateUrl: 'templates/add_meter_reading.html',
                controller: "roomCtrl",
                resolve: isLogged = true
		  })
		  .when('/assignRoom',{
                templateUrl: 'templates/assign_room.html',
                controller: "roomCtrl",
                resolve: isLogged = true
		  })
		  .when('/user/:id/take/rent',{
                templateUrl: 'templates/take_rent.html',
                controller: "userCtrl",
                resolve: isLogged = true
		  })
		  .when('/room/:id/rent/paid',{
                templateUrl: 'templates/users_list.html',
                controller: "userCtrl",
                resolve: isLogged = true
		  })
		  .when('/show/user/:id/date/:paid_date/invoice',{
                templateUrl: 'templates/invoice.html',
                controller: "userCtrl",
                resolve: isLogged = true
		  })
		  .when('/user/:id/rent/history',{
                templateUrl: 'templates/rent_history.html',
                controller: "userCtrl",
                resolve: isLogged = true
		  })
		  .otherwise({
        redirectTo: '/home'
      });
}).run(function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
	 	
        if ($rootScope.current_user == undefined && (angular.isObject(JSON.parse(sessionStorage.user)))) {
		   $rootScope.current_user = JSON.parse(sessionStorage.user);
		   $rootScope.login = true;
		   $rootScope.isLogged = true;
        }
	  
        if ($rootScope.isLogged == false || $rootScope.isLogged === undefined ) {
		   if(next.templateUrl == 'templates/signin.html')
		   {
		       $location.path("/signin");
           }else
            {
               if(next.templateUrl != 'templates/home.html')
               {
			       $location.path("/home"); 
		       }    
		    } 
        }
    });
  });
