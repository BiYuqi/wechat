angular.module('controllers',[])
    .controller('loginCtrl',function($scope,$state,serviceCtrl){
        $scope.userInfo = {

        };
        $scope.login = function(){
            serviceCtrl.checkLogin($scope.userInfo.userName,$scope.userInfo.password)
                .success(function (data) {
                    // console.log(data);
                    // console.log($scope.userInfo);
                    if($scope.userInfo.userName !=null){
                        if($scope.userInfo.userName == data.name && $scope.userInfo.password == data.psw){
                            var userInfo = $scope.userInfo;
                            // console.log(userInfo);
                            localStorage.setItem("userInfo",JSON.stringify(userInfo));
                            $state.go('main.chat');
                        }else{
                            alert("用户名或者密码错误")
                        }
                    }


                })
                .error(function (err) {
                    
                })
        }
    })
    .controller('mainCtrl',function($scope,$state){
        $scope.btnSearch = function(){
            $state.go('searchDetail')
        };
    })
    .controller('chatCtrl',function($scope,$http,$state,$ionicPopup){
        $scope.chatList = [];
        $http.get('app/data/chat.json')
            .success(function (data) {
                $scope.chatList = data;
            });
        //把名字一起传走
        $scope.toDetail = function($index,$name){
            //把id(索引)传递给下个页面
            $state.go('chatDetail', {id: $index,name:$name});
        };
        //长摁
        $scope.onHold = function($index){
            var alertPopup = $ionicPopup.alert({
                // title: 'Don\'t eat that!',
                template: '删除聊天'
            });
            alertPopup.then(function(res) {
                for(var i=0;i<$scope.chatList.length;i++){
                    if(i == $index){
                        $scope.chatList.splice($index,1);
                    }
                }
            });

        }

    })
    .controller('contactCtrl',function($scope,$http){
        $scope.contactList = [];
        $scope.conList = [];
        $http.get('app/data/contact.json')
            .success(function (data) {
                $scope.contactList = data;
                console.log(data);
            });
    })
    .controller('discovCtrl',function($scope,$state){
        $scope.toFriendShip = function(){
            $state.go('friendShip')
        }
    })
    .controller('personCtrl',function($scope){

    })
    .controller('chatDetailCtrl',function($scope, $state, $stateParams,$http,$ionicHistory){
        var id = $stateParams.id;
        var name = $stateParams.name;
        console.log(name);
        $scope.perName = name;
        $scope.detailList = [];
        $http.get('app/data/detail.json')
            .success(function (data) {
                //选取第几组数据
                // console.log(data[id]);
                $scope.detailList = data[id];
            });
        $scope.backPrev = function() {
            $ionicHistory.goBack();
        };
        $scope.perDetail = function(){
            // console.log(id);
            //带参数把id传给下一个页面
            $state.go('personDetail',{id:id});
        }

    })
    .controller('personDetailCtrl',function($scope,$state, $stateParams,$http,$ionicHistory){
        //接收上个页面的id
        var id = $stateParams.id;
        console.log(id);
        $scope.prevThird = function() {
            $ionicHistory.goBack();
        };
    })
    .controller('searchCtrl',function($scope,$state, $stateParams,$http,$ionicHistory){
        $scope.prevThird = function() {
            $ionicHistory.goBack();
        };
    })
    .controller('friendCtrl',function($scope,$state,$http,$ionicHistory){
        $scope.friendBack = function() {
            $ionicHistory.goBack();
        };
        $scope.myComent = false;
        $scope.toggle = function(){
            $scope.myComent = !$scope.myComent
        };
        //加载数据
        $scope.friendList = [];
        $http.get("app/data/friend.json")
            .success(function (data) {
                console.log(data);
                $scope.friendList = data;
            })
    });

