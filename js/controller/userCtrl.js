app.controller('userCtrl',function ($scope,$rootScope,$location,$http,toaster,$routeParams,url,SharedService,ngProgress){
      
	$rootScope.isLogged = false;
	$scope.gender_opts = [{name: 'Male', value: 'male' }, {name: 'Female', value: 'female' }];
	$scope.gender = $scope.gender_opts[0];
	
	$scope.status_opts = [{name: 'Married', value: 'married' }, {name: 'Unmarried', value: 'unmarried' }];
	$scope.status = $scope.status_opts[0];
     	
 	//login process
	$scope.logIn = function()
	{
		ngProgress.start();
	    var email = $scope.email;
		var password = $scope.password;
		$rootScope.currentUser = [];
		$rootScope.login = false;
		var flag = 0;  
		
		$http.post(url+'/users/sign_in?user[email]='+email+'&user[password]='+password+'').
		    success(function(data, status, headers, config) {
			    $rootScope.current_user = data.users;
			    $rootScope.login = true;
			    $rootScope.isLogged = true;
			    ngProgress.complete();
			    $location.path("/welcome");
			    toaster.pop('success', "Successfully Login!", $rootScope.current_user.first_name);
		    }).
		    error(function(data, status, headers, config) {
				ngProgress.complete();
			    toaster.pop('error', "Error!", data.errors);
		    });
	};
	 
	//addUser process
    $scope.addUser = function()
    {
		ngProgress.start();
	    $http.post(url+'/users?user[email]='+$scope.email+'&user[password]='+$scope.password+'&user[first_name]='+$scope.first_name+'&user[last_name]='+$scope.last_name+'&user[address]='+$scope.address+'&user[phone]='+$scope.phone+'&user[identity_number]='+$scope.identity_number+'&user[pan_number]='+$scope.pan_number+'&user[aadhar_number]='+$scope.aadhar_number+'&user[status]='+$scope.status.name+'&user[gender]='+$scope.gender.name+'').
            success(function(data, status, headers, config) {
		        $scope.add_user = data.users;       
		        SharedService.setUserDetail($scope.add_user);       
                $location.path("/assign/"+$scope.add_user.first_name+"/room");
		        toaster.pop('success', "Successfully Add User!");
		        ngProgress.complete();
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });
    };
	
	//logOut process 
	$scope.logOut = function()
    {
		ngProgress.start();
	    $http.get(url+'/users/logout?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $rootScope.isLogged = false;
                $rootScope.login = false;
                 ngProgress.complete();
                $location.path("/user/"+$rootScope.current_user.first_name+"/logout");
		        toaster.pop('success', data.message);
		       
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });
    };
     
    //userList
    $scope.usersList = function()
    {
		ngProgress.start();
	    $scope.users=[];
	    
        $http.get(url+'/users?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
			    $scope.users = data.users;
			    ngProgress.complete();
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });
    };
     
    //delete user
    $scope.deleteUser = function(id)
    {
		ngProgress.start();
	    $scope.id = $routeParams.id;	
	    
		$http.get(url+'/users/'+id+'/delete?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {	   
		 	    toaster.pop('success', "Successfully Delete!");
		 	    ngProgress.complete();
		    }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });
    };
 
    //edit user details show on edit page
    $scope.editUser = function()
    {  
		ngProgress.start();
	    var id = $routeParams.id;
    		 
	  	$http.get(url+'/users/'+id+'?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.user = data.users;	
				ngProgress.complete(); 
		    }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });
   
	};
	 
	//save after edit user profile
	$scope.updateUser = function(id)
	{   
	    ngProgress.start();
	    $http.post(url+'/users/update_profile?api_token='+$rootScope.current_user.api_token+'&id='+id+'&user[first_name]='+$scope.user.first_name+'&user[last_name]='+$scope.user.last_name+'&user[gender]='+$scope.user.gender+'&user[address]='+$scope.user.address+'&user[identity_number]='+$scope.user.identity_number+'&user[aadhar_number]='+$scope.user.aadhar_number+'&user[pan_number]='+$scope.user.pan_number+'&user[status]='+$scope.user.status+'&user[phone]='+$scope.user.phone+'').
            success(function(data, status, headers, config) {
			    $location.path("/user/"+$scope.user.id+"/updated");
			    toaster.pop('success', "Successfully Updated!");
			    ngProgress.complete();
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });
    };
     
    //when user click assign room on user list page 
    $scope.issueRoom = function(id)
    {
		ngProgress.start();
	    
		$http.get(url+'/users/'+id+'?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.user = data.users;
		        SharedService.setUser($scope.user);
		        ngProgress.complete();
		    }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });   
	};
     
    //Cancel room 
    $scope.cancelRoom = function(id)
    {	
		ngProgress.start();	 
		 
		$http.get(url+'/users/'+id+'?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.user = data.users;
			    $scope.cancel_room_id = $scope.user.room_id;
			    
			    $http.post(url+'/users/update_profile?api_token='+$rootScope.current_user.api_token+'&id='+id+'&user[first_name]='+$scope.user.first_name+'&user[last_name]='+$scope.user.last_name+'&user[gender]='+$scope.user.gender+'&user[address]='+$scope.user.address+'&user[identity_number]='+$scope.user.identity_number+'&user[aadhar_number]='+$scope.user.aadhar_number+'&user[pan_number]='+$scope.user.pan_number+'&user[status]='+$scope.user.status+'&user[phone]='+$scope.user.phone+'&user[room_id]='+' '+'').
                    success(function(data, status, headers, config) {
			            toaster.pop('success', "Successfully Room Cancel!");
			            ngProgress.complete();
	                }).
	                error(function(data, status, headers, config) {
		                toaster.pop('error', "Error!", data.errors);
		                ngProgress.complete();
	                }); 
	                $location.path("/room/"+$scope.cancel_room_id+"/cancel");
		    }).
		    error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });
	};
	 
	//calculate Pending
	$scope.calculatePending = function()
	{
	    $scope.disabled = true;
		var id = $routeParams.id;
		$scope.rents = [];
		
		$http.get(url+'/users/'+id+'?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.user = data.users;
			   
			    $http.get(url+'/rooms/'+$scope.user.room_id+'?api_token='+$rootScope.current_user.api_token+'').
				    success(function(data, status, headers, config) { 
					    $scope.room = data.rooms;
					    $http.get(url+'/rents?api_token='+$rootScope.current_user.api_token+'&user_id='+$scope.user.id+'').
                            success(function(data, status, headers, config) {
			                    $scope.rents = data.rents; 
			                    
			                    for(i in $scope.rents)
			                    {								
			                        if(i == $scope.rents.length-1)
			                        {
				                        $scope.previous_pending_amount = $scope.rents[i].pending_amount;				                        
				                        break;	
			                        }  
			                    }
			                    
			                    $scope.pending_amount = $scope.room.rent + $scope.previous_pending_amount - $scope.paid_amount;
	                        }).
	                        error(function(data, status, headers, config) {
		                        toaster.pop('error', "Error!", data.errors);
	                        });
					    
				    }).
				    error(function(data, status, headers, config) {
					    toaster.pop('error', "Error!", data.errors);
				    });
	        }).
		    error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        });
    };
	 
	//take rent 
    $scope.takeRent = function()
    {
		ngProgress.start();
	    var id = $routeParams.id;
		$scope.rents = [];
		 
		$http.get(url+'/users/'+id+'?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.users = data.users;
			    
			    $http.post(url+'/rents?api_token='+$rootScope.current_user.api_token+'&rent[user_id]='+$scope.user.id+'&rent[room_id]='+$scope.user.room_id+'&rent[paid_amount]='+$scope.paid_amount+'&rent[pending_amount]='+$scope.pending_amount+'&rent[paid_date]='+$scope.paid_date+'').
                    success(function(data, status, headers, config) {
			            toaster.pop('success', "Successfully Rent Paid"); 
			            $location.path("/room/"+$scope.user.room_id+"/rent/paid");
			            ngProgress.complete();
	                }).
	                error(function(data, status, headers, config) {
		                toaster.pop('error', "Error!", data.errors);
		                ngProgress.complete();
	                }); 
	              
		    }).
		    error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });
	};
	
	//rent history
	$scope.rentHistory = function()
	{
		ngProgress.start();
	    var id = $routeParams.id;
	    
	    $scope.rents = [];
	    
	    $http.get(url+'/rents?api_token='+$rootScope.current_user.api_token+'&user_id='+id+'').
            success(function(data, status, headers, config) {
			    $scope.rents = data.rents; 
			    ngProgress.complete();
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        }); 
	    	
	};
	
	//generate Invoice
	$scope.generateInvoice = function()
	{
		ngProgress.start();
		var id = $routeParams.id;
		var date = $routeParams.paid_date;
	    $scope.rents = [];
		
		$http.get(url+'/users/'+id+'?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.user = data.users;

			    $http.get(url+'/rooms/'+$scope.user.room_id+'?api_token='+$rootScope.current_user.api_token+'').
				    success(function(data, status, headers, config) { 
					    $scope.room = data.rooms;
					    $http.get(url+'/rents?api_token='+$rootScope.current_user.api_token+'&user_id='+$scope.user.id+'').
                            success(function(data, status, headers, config) {
			                    $scope.rents = data.rents;
			                    
			                    for(i in $scope.rents)
			                    {
			                        if(date == $scope.rents[i].paid_date)
			                        {
				                        $scope.rent = $scope.rents[i];
				                        break;	
			                        }
			                    }
			                   
			                    $scope.current_date = new Date();
			                    ngProgress.complete();
			                }).
	                        error(function(data, status, headers, config) {
		                        toaster.pop('error', "Error!", data.errors);
		                        ngProgress.complete();
	                        });
					    
				    }).
				    error(function(data, status, headers, config) {
					    toaster.pop('error', "Error!", data.errors);
					    ngProgress.complete();
				    });     
			                    
			}).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });   
	};
	 
    //get location through typeahead
    $scope.getLocation = function(val) 
    {
        return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                   params: {
                       address: val,
                       sensor: false
                   }
               }).then(function(response){
                     return response.data.results.map(function(item){
                               return item.formatted_address;
                            });
                  });
    };

});
