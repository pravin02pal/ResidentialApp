app.controller('userCtrl',function ($scope,$rootScope,$location,$http,toaster,$routeParams,url,SharedService){
      
	$rootScope.isLogged = false;
	$scope.gender_opts = [{name: 'Male', value: 'male' }, {name: 'Female', value: 'female' }];
	$scope.gender = $scope.gender_opts[0];
	
	$scope.status_opts = [{name: 'Married', value: 'married' }, {name: 'Unmarried', value: 'unmarried' }];
	$scope.status = $scope.status_opts[0];
     	
 	//login process
	$scope.logIn = function()
	{
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
			    $location.path("/welcome");
			    toaster.pop('success', "Successfully Login!", $rootScope.current_user.first_name);
		    }).
		    error(function(data, status, headers, config) {
			    toaster.pop('error', "Error!", data.errors);
		    });
	};
	 
	//addUser process
    $scope.addUser = function()
    {
	    $http.post(url+'/users?user[email]='+$scope.email+'&user[password]='+$scope.password+'&user[first_name]='+$scope.first_name+'&user[last_name]='+$scope.last_name+'&user[address]='+$scope.address+'&user[phone]='+$scope.phone+'&user[identity_number]='+$scope.identity_number+'&user[pan_number]='+$scope.pan_number+'&user[aadhar_number]='+$scope.aadhar_number+'&user[status]='+$scope.status.name+'&user[gender]='+$scope.gender.name+'').
            success(function(data, status, headers, config) {
		        $scope.add_user = data.users;       
		        SharedService.setUserDetail($scope.add_user);       
                $location.path("/assign/"+$scope.add_user.first_name+"/room");
		        toaster.pop('success', "Successfully Add User!");
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        });
    };
	
	//logOut process 
	$scope.logOut = function()
    {
	    $http.get(url+'/users/logout?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $rootScope.isLogged = false;
                $rootScope.login = false;
                $location.path("/user/"+$rootScope.current_user.first_name+"/logout");
		        toaster.pop('success', data.message);
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        });
    };
     
    //userList
    $scope.usersList = function()
    {
	    $scope.users=[];
	    
        $http.get(url+'/users?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
			    $scope.users = data.users;
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        });
    };
     
    //delete user
    $scope.deleteUser = function(id)
    {
	    $scope.id = $routeParams.id;	
	    
		$http.get(url+'/users/'+id+'/delete?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {	   
		 	    toaster.pop('success', "Successfully Delete!");
		    }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        });
    };
 
    //edit user details show on edit page
    $scope.editUser = function()
    {  
	    var id = $routeParams.id;
    		 
	  	$http.get(url+'/users?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.users_details = data.users;	
			
	     		for(i in $scope.users_details)
		    	{
			        if(id == $scope.users_details[i].id)
			        {
				        $scope.user = $scope.users_details[i];    
	 			        break;	
			        }
			    }  
		    }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        });
   
	};
	 
	//save after edit user profile
	$scope.updateUser = function(id)
	{   
	   
	    $http.post(url+'/users/update_profile?api_token='+$rootScope.current_user.api_token+'&id='+id+'&user[first_name]='+$scope.user.first_name+'&user[last_name]='+$scope.user.last_name+'&user[gender]='+$scope.user.gender+'&user[address]='+$scope.user.address+'&user[identity_number]='+$scope.user.identity_number+'&user[aadhar_number]='+$scope.user.aadhar_number+'&user[pan_number]='+$scope.user.pan_number+'&user[status]='+$scope.user.status+'&user[phone]='+$scope.user.phone+'').
            success(function(data, status, headers, config) {
			    $location.path("/user/"+$scope.user.id+"/updated");
			    toaster.pop('success', "Successfully Updated!");
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        });
    };
     
    //when user click assign room on user list page 
    $scope.issueRoom = function(id)
    {
	    $scope.users = [];
	    
		$http.get(url+'/users/?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.users = data.users;

		        for(i in $scope.users)
			    {
			        if(id == $scope.users[i].id)
			        {
				        $scope.user = $scope.users[i];
				        break;	
			        }  
			    }
			
		        SharedService.setUser($scope.user);
		    }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        });   
	};
     
    //Cancel room 
    $scope.cancelRoom = function(id)
    {		 
	    $scope.users = [];
		 
		$http.get(url+'/users/?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.users = data.users;

		        for(i in $scope.users)
			    {
			        if(id == $scope.users[i].id)
			        {
				        $scope.user = $scope.users[i];
				        break;	
			        }  
			    }
			 
			    $scope.cancel_room_id = $scope.user.room_id;
			    
			    $http.post(url+'/users/update_profile?api_token='+$rootScope.current_user.api_token+'&id='+id+'&user[first_name]='+$scope.user.first_name+'&user[last_name]='+$scope.user.last_name+'&user[gender]='+$scope.user.gender+'&user[address]='+$scope.user.address+'&user[identity_number]='+$scope.user.identity_number+'&user[aadhar_number]='+$scope.user.aadhar_number+'&user[pan_number]='+$scope.user.pan_number+'&user[status]='+$scope.user.status+'&user[phone]='+$scope.user.phone+'&user[room_id]='+' '+'').
                    success(function(data, status, headers, config) {
			            toaster.pop('success', "Successfully Room Cancel!");
	                }).
	                error(function(data, status, headers, config) {
		                toaster.pop('error', "Error!", data.errors);
	                }); 
	                $location.path("/room/"+$scope.cancel_room_id+"/cancel");
		    }).
		    error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        });
	};
	 
	//calculate Pending
	$scope.calculatePending = function()
	{
	    $scope.disabled = true;
		var id = $routeParams.id;
		$scope.users = [];
		$scope.rents = [];
		
		$http.get(url+'/users/?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.users = data.users;

		        for(i in $scope.users)
			    {
			        if(id == $scope.users[i].id)
			        {
				        $scope.user = $scope.users[i];
				        break;	
			        }  
			    }
			   
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
	    var id = $routeParams.id;
		$scope.users = [];
		$scope.rents = [];
		 
		$http.get(url+'/users/?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.users = data.users;

		        for(i in $scope.users)
			    {
			        if(id == $scope.users[i].id)
			        {
				        $scope.user = $scope.users[i];
				        break;	
			        }  
			    }
			    
			    $http.post(url+'/rents?api_token='+$rootScope.current_user.api_token+'&rent[user_id]='+$scope.user.id+'&rent[room_id]='+$scope.user.room_id+'&rent[paid_amount]='+$scope.paid_amount+'&rent[pending_amount]='+$scope.pending_amount+'&rent[paid_date]='+$scope.paid_date+'').
                    success(function(data, status, headers, config) {
			            toaster.pop('success', "Successfully Rent Paid"); 
			            $location.path("/room/"+$scope.user.room_id+"/rent/paid");
	                }).
	                error(function(data, status, headers, config) {
		                toaster.pop('error', "Error!", data.errors);
	                }); 
	              
		    }).
		    error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        });
	};
	
	//rent history
	$scope.rentHistory = function()
	{
	    var id = $routeParams.id;
	    
	    $scope.rents = [];
	    
	    $http.get(url+'/rents?api_token='+$rootScope.current_user.api_token+'&user_id='+id+'').
            success(function(data, status, headers, config) {
			    $scope.rents = data.rents; 
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        }); 
	    	
	};
	
	//generate Invoice
	$scope.generateInvoice = function()
	{
		var id = $routeParams.id;
		var date = $routeParams.paid_date;
		var c = 0;
	    $scope.users = [];
	    $scope.rents = [];
		
		$http.get(url+'/users/?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
		        $scope.users = data.users;

		        for(i in $scope.users)
			    {
			        if(id == $scope.users[i].id)
			        {
				        $scope.user = $scope.users[i];
				        break;	
			        }  
			    }
			    
			    $http.get(url+'/rooms/'+$scope.user.room_id+'?api_token='+$rootScope.current_user.api_token+'').
				    success(function(data, status, headers, config) { 
					    $scope.room = data.rooms;
					    $http.get(url+'/rents?api_token='+$rootScope.current_user.api_token+'&user_id='+$scope.user.id+'').
                            success(function(data, status, headers, config) {
			                    $scope.rents = data.rents;
			                    
			                    for(i in $scope.rents)
			                    {
									c++;
			                        if(date == $scope.rents[i].paid_date)
			                        {
				                        $scope.rent = $scope.rents[i];
				                        break;	
			                        }
			                    }
			                    for(i in $scope.rents)
			                    {
								    if(i == c-2)
			                        {
				                       $scope.previous_pending_amount=$scope.rents[i].pending_amount;
			                        } 
								}
			                    
			                    $scope.total_amount = $scope.room.rent + $scope.previous_pending_amount;
			                    $scope.pending = $scope.total_amount - $scope.rent.paid_amount;
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
