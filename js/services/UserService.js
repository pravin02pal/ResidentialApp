app.service('UserService',function($http,$rootScope,$location,toaster,url,$q)
{   
   
   
   //login process
 
   /*edit user details show on edit page
  this.editUserDetail=function(id)
   {
	  
	    var def = $q.defer();
      $http.get(url+'/users?api_token='+$rootScope.current_user.api_token+'').
      success(function(data, status, headers, config) {
		 var users = data.users;	
		 for(i in users)
		 {
			if(id == users[i].id)
			{
			   value = users[i];
			   console.log(value);
			   def.resolve(value);
			   break;	
			}  
		 }
		// console.log(user);
	  }).
	   error(function(data, status, headers, config) {
		   toaster.pop('error', "Error!", data.errors);
	   });
	   return def.promise;
   };*/
   
   this.getUserDetail=function()
   {
	   console.log(value);
	  return value;
   }
   
   //update user profile 
   this.updateUser=function(id)
   {
	  $http.post(url+'/users/update_profile?api_token='+$rootScope.current_user.api_token+'&id='+id+'&user[first_name]='+user.first_name+'&user[last_name]='+user.last_name+'&user[gender]='+user.gender+'&user[address]='+user.address+'&user[identity_number]='+user.identity_number+'&user[aadhar_number]='+user.aadhar_number+'&user[pan_number]='+user.pan_number+'&user[status]='+user.status+'&user[phone]='+user.phone+'').
      success(function(data, status, headers, config) {
		  $location.path("/user/"+user.id+"/updated");
		  toaster.pop('success', "Successfully Updated!");
	  }).
	    error(function(data, status, headers, config) {
		   toaster.pop('error', "Error!", data.errors);
	    });
   };
   
});
