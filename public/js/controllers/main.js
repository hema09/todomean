angular.module('todoController',[])
	.controller('mainController', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.todos = [];

		Todos.get()
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(error) {
				console.log("error loading todos : " + error);
			});

		$scope.deleteTodo = function(id) {
			Todos.delete(id)
				.success(function(data){
					$scope.todos = data;
					console.log(data);
				})
				.error(function(err) {
					console.log("error in post = " + err);	
				});
		};

		$scope.createTodo = function() {
			console.log('creating todo..' + $scope.formData);
			Todos.create($scope.formData)
				.success(function(data) {
					$scope.todos = data;
					$scope.formData.text = '';
					console.log(data);
				})
				.error(function(err) {
					console.log("error in post = " + err);	
				});
		};
	})