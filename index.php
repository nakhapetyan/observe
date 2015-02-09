<html ng-app="app" ng-controller="controller">
<style>
li, li.ng-enter-activ {
	opacity: 1;
    transition: 0.5s;
}
li.ng-enter, li.ng-leave-active{
    opacity: 0;
}

</style>

<ol>
	<li ng-repeat="(id,user) in users" class="fade">{{user.name}}</li>
</ol>

</html>


<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.0-beta.1/angular.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.0-beta.1/angular-animate.js"></script>

<script src="http://sanstv.ru:8085/socket.io/socket.io.js"></script>
<script src="observe-shim.js"></script>
<script src="observe.js"></script>
<script>

var APP = angular.module('app', ['ngAnimate']); // инициализация angularjs
APP.controller('controller', function ($scope){
	window.$$ = $scope;
	var keys = Object.keys(window);
	for (var i in keys) $scope[keys[i]] = window[keys[i]];
});


var socket = io.connect('http://sanstv.ru:8085?room='+location.pathname);
socket.on('change', function (data){console.log(data);
	if (data.type == 'add' || data.type == 'update') eval('$$' + data.path + ' = data.value');
	else if (data.type == 'delete') eval('delete $$'+data.path);
	else if (!data.type) for (i in data.value) $$[i] = data.value[i];
	$$.$apply();
});


Object.resolve = function(path, obj) {
    return [obj || self].concat(path.split('.')).reduce(function(prev, curr) {
        return prev[curr]
    })
}


</script>