app.controller('roomCtrl',function ($scope,$rootScope,$http,$location,toaster,$routeParams,url,SharedService,ngProgress){
	
	$scope.room_types = [{name: '1BHK', value: '1BHK' },
	                    {name: '2BHK', value: '2BHK' },
	                    {name: '3BHK', value: '3BHK' }
	                    ];
	$scope.rtype = $scope.room_types[0];
	$scope.myDate = new Date();
	
    //rooms list
    $scope.roomsList = function()
    {
		ngProgress.start();
	    $scope.rooms=[];
	    
        $http.get(url+'/rooms?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
			    $scope.rooms = data.rooms;   
			    ngProgress.complete();
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });
     };
     
	//create room
	$scope.createRoom=function()
	{  
		ngProgress.start();
		
	    $http.post(url+'/rooms?api_token='+$rootScope.current_user.api_token+'&room[rnumber]='+$scope.rnumber+'&room[rent]='+$scope.rent+'&room[rtype]='+$scope.rtype.name+'').
            success(function(data, status, headers, config) {                        
		        toaster.pop('success', "Successfully Room Created!");
		        $location.path("/room/"+$scope.rnumber+"/created");  
		        ngProgress.complete();   
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });
    };
    
    //edit room
    $scope.editRoom=function()
	{	 
		ngProgress.start();
	    var id = $routeParams.id;
	   		   
	    $http.get(url+'/rooms/'+id+'?api_token='+$rootScope.current_user.api_token+'').
		    success(function(data, status, headers, config) { 
			    $scope.room = data.rooms;
			    ngProgress.complete();
		    }).
			error(function(data, status, headers, config) {
			    toaster.pop('error', "Error!", data.errors);
			    ngProgress.complete();
			});
    };
    
    //delete room
    $scope.deleteRoom = function(id)
    {   
		ngProgress.start();
	    $scope.id = $routeParams.id;
	    
        $http.get(url+'/rooms/'+id+'/delete?api_token='+$rootScope.current_user.api_token+'').
		    success(function(data, status, headers, config) {	
			    toaster.pop('success', "Successfully Delete!");
			    ngProgress.complete();
			}).
			error(function(data, status, headers, config) {
				toaster.pop('error', "Error!", data.errors);
				ngProgress.complete();
			});
	};
    
    //update room  
    $scope.updateRoom=function(id)
	{
		ngProgress.start();
		
	    $http.post(url+'/rooms/update_room/?api_token='+$rootScope.current_user.api_token+'&id='+id+'&room[rnumber]='+$scope.room.rnumber+'&room[rent]='+$scope.room.rent+'&room[rtype]='+$scope.room.rtype+'').
		   success(function(data, status, headers, config) {                       
			   toaster.pop('success', "Successfully Room Updated!");
			   $location.path("/room/"+$scope.room.id+"/updated"); 
			   ngProgress.complete();    
		   }).
		   error(function(data, status, headers, config) {
			   toaster.pop('error', "Error!", data.errors);
			   ngProgress.complete();
		   });
    };
    
    //room alloted to the new user
    $scope.assign_room = function()
    {
		ngProgress.start();
	    $scope.add_user = SharedService.getUser();
		 
		if(angular.isObject($scope.room_id))
		{
		    toaster.pop('error', "Select a valid room number");
		}else{
			     $http.post(url+'/users/update_profile?api_token='+$rootScope.current_user.api_token+'&id='+$scope.add_user.id+'&user[first_name]='+$scope.add_user.first_name+'&user[last_name]='+$scope.add_user.last_name+'&user[gender]='+$scope.add_user.gender+'&user[address]='+$scope.add_user.address+'&user[identity_number]='+$scope.add_user.identity_number+'&user[aadhar_number]='+$scope.add_user.aadhar_number+'&user[pan_number]='+$scope.add_user.pan_number+'&user[status]='+$scope.add_user.status+'&user[phone]='+$scope.add_user.phone+'&user[room_id]='+$scope.room_id+'').
                     success(function(data, status, headers, config) {
			             $location.path("/user_name/"+$scope.add_user.first_name+"/room_id/"+$scope.room_id+"/allotted");
			             toaster.pop('success', "Successfully Room allotted!");
			             ngProgress.complete();
	                 }).
	                 error(function(data, status, headers, config) {
		                 toaster.pop('error', "Error!", data.errors);
		                 ngProgress.complete();
	                 });
			 }
		
    };
     
    //find all room details which is not alloted any users
	$scope.getNotAllotedRooms = function()
	{  
		ngProgress.start();
	    $scope.users=[];
		$scope.user=[];
		 
        $http.get(url+'/users?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
			    $scope.users = data.users;
	            for(i in $scope.users)
			    {
			        if($scope.users[i].room_id != null)
			        {   
				        $scope.user[i] = $scope.users[i].room_id;
			        }  
		        }	
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
	        });
	        
	    $scope.rooms=[];
	    $scope.selected_rooms=[];
	    var k = 0;
	    
        $http.get(url+'/rooms?api_token='+$rootScope.current_user.api_token+'').
            success(function(data, status, headers, config) {
			    $scope.rooms = data.rooms;  
			   
			    for(i in $scope.rooms)
			    {
				    var flag = 0;
				    for(j in $scope.user)
			        {
			            if($scope.user[j] == $scope.rooms[i].id)
			            { 
						    flag++;  
			            } 
			        }
			      
			        if(flag == 0)
			        {
					    $scope.selected_rooms[k] = $scope.rooms[i];	
					    k++;	
				    } 
		        }
		       	ngProgress.complete();
	        }).
	        error(function(data, status, headers, config) {
		        toaster.pop('error', "Error!", data.errors);
		        ngProgress.complete();
	        });
	       
	 };
     
});
