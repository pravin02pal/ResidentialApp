app.service('SharedService',function($http,$rootScope,$location)
{   
	 var setUser =' ';
    this.setUserDetail=function(users)
   {
      setUser = users;
   }
    this.getUserDetail=function()
   {
	  return setUser;
   }
   
});
