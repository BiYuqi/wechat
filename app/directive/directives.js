angular.module("directives",['ionic'])
    .directive("userComment",function () {
        return {
            restrict:"AE",
            template:'<img class="comment" src="app/images/comment.png" ng-click="toggle()"/>'+
                        '<a class="dark-bg" ng-show="myComent">'+
                        '<span><i class="icon ion-thumbsup"></i>'+
                        '赞'+
                        '</span>'+
                        '<span><i class="icon ion-chatbox"></i>'+
                        '评论'+
                        '</span>'+
                        '</a>'
        }
    });