app.service('SharedService',function($http,$rootScope,$location)
{   
	 var setUsers =' ';
	 var setUser =' ';
    this.setUserDetail=function(users)
    {
      setUsers = users;
    }
    this.getUserDetail=function()
    {
	  return setUsers;
    }
    this.setUser=function(user)
    {
      setUser = user;
    }
    this.getUser=function()
    {
	  return setUser;
    }
   
});
