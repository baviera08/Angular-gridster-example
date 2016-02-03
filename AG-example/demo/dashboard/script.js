angular.module('app')

.controller('DashboardCtrl', ['$scope', '$timeout',
	function($scope, $timeout) {
		$scope.gridsterOptions = {
			margins: [20, 20],
			columns: 6,
			draggable: {
				handle: 'h3'
			}
		};
//asigna dos dashboard para que sean los iniciales
		$scope.dashboards = {
			'1': {
				id: '1',
				name: 'Home',
				widgets: [{
					col: 2,
					row: 0,
					sizeY: 2,
					sizeX: 2,
					name: "Widget 1"
				}, {
					col: 0,
					row: 0,
					sizeY: 2,
					sizeX: 2,
					name: "Widget 2"
				}]
			},
			'2': {
				id: '2',
				name: 'Other',
				widgets: [{
					col: 1,
					row: 1,
					sizeY: 1,
					sizeX: 2,
					name: "Other Widget 1"
				}, {
					col: 1,
					row: 3,
					sizeY: 1,
					sizeX: 1,
					name: "Other Widget 2"
				}]
			}
		};
//borra los widgets
		$scope.clear = function() {
			$scope.dashboard.widgets = [];
		};
//agrega un nuevo widget
		$scope.addWidget = function() {
			$scope.dashboard.widgets.push({
				name: "New Widget",
				sizeX: 1,
				sizeY: 1
			});
		};

		$scope.$watch('selectedDashboardId', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				$scope.dashboard = $scope.dashboards[newVal];
			} else {
				$scope.dashboard = $scope.dashboards[1];
			}
		});

		// init dashboard
		$scope.selectedDashboardId = '1';

	}
])


/*
.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
   var viewModel = this;

   viewmodel.addSome= function(){


 	 }
}])

.directive('myCustomer', function() {
  return {
  	restrict: 'E',
    template: 'Name: {{customer.name}} Address: {{customer.address}}'
   //template: '<h1>huehuehueh</h1>'
  }
})
*/


.controller('CustomWidgetCtrl', ['$scope', '$modal',
	function($scope, $modal) {

		$scope.remove = function(widget) {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
		};

		$scope.openSettings = function(widget) {
			$modal.open({
				scope: $scope,
				templateUrl: 'demo/dashboard/widget_settings.html',
				controller: 'WidgetSettingsCtrl',
				resolve: {
					widget: function() {
						return widget;
					}
				}
			});
		};

	}
])

.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
	function($scope, $timeout, $rootScope, $modalInstance, widget) {
		$scope.widget = widget;

		$scope.form = {
			name: widget.name,
			sizeX: widget.sizeX,
			sizeY: widget.sizeY,
			col: widget.col,
			row: widget.row
		};

		$scope.sizeOptions = [{
			id: '1',
			name: '1'
		}, {
			id: '2',
			name: '2'
		}, {
			id: '3',
			name: '3'
		}, {
			id: '4',
			name: '4'
		}];

		$scope.dismiss = function() {
			$modalInstance.dismiss();
		};

		$scope.remove = function() {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
			$modalInstance.close();
		};

		$scope.submit = function() {
			angular.extend(widget, $scope.form);

			$modalInstance.close(widget);
		};

	}
])

// helper code
.filter('object2Array', function() {
	return function(input) {
		var out = [];
		for (i in input) {
			out.push(input[i]);
		}
		return out;
	}
})

.directive('test', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            text: '@'
        },
        template: '<p ng-click="add()">{{text}}</p>',
        controller: function ($scope, $element) {
            $scope.add = function () {
                var el = $compile("<test text='n'></test>")($scope);
                $element.parent().append(el);
            };
        }

    };
})

.controller('crtl', ['$scope', function($scope) { }]);
 



//function crtl($scope) {}