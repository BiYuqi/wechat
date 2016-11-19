angular.module('myServices',[])
.service('serviceCtrl',function($http){
    this.checkLogin = function(u,p){
        return $http({
            url:'app/data/userinfo.json',
            method:"GET"
        })
    }
})