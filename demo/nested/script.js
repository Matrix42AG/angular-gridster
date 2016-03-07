angular.module('app')

.controller('NestedCtrl', function($scope) {

	function ChildGridster(items) {
		var self = this;

		this.items = items;
		this.opts = {
			columns: 3,
			margins: [5, 5],
			outerMargin: false,
			pushing: true,
			floating: true,
			mobileModeEnabled: false,
			draggable: {
				enabled: true,
				nestingEnabled: true,
				addItem: function(item) {
					items.push(item);
				},
				removeItem: function(item) {
					var index = items.indexOf(item);
					items.splice(index, 1);

					if (items.length === 0) {
						index = $scope.globalItems.indexOf(findParent());
						$scope.globalItems.splice(index, 1);
					}
				}
			},
			resizable: {
				enabled: true,
				handles: ['se']
			}
		};

		function findParent() {
			for (var i = 0; i < $scope.globalItems.length; i++) {
				if ($scope.globalItems[i].content.gridster === self) {
					return $scope.globalItems[i];
				}
			}
		}
	}

	$scope.globalGristerOpts = {
		columns: 6,
		margins: [20, 20],
		outerMargin: false,
		pushing: true,
		floating: true,
		mobileModeEnabled: false,
		draggable: {
			enabled: true,
			addItem: function(item) {
				$scope.globalItems.push({
					sizeX: 2,
					sizeY: 2,
					row: item.row,
					col: item.col,
					content: {
						title: 'New Item',
						gridster: new ChildGridster([item])
					}
				});

				item.row = 0;
				item.col = 0;
			}
		},
		resizable: {
			enabled: false
		}
	};

	$scope.globalItems = [{
		sizeX: 2,
		sizeY: 2,
		row: 0,
		col: 0,
		content: {
			title: 'Top Left',
			gridster: new ChildGridster([{
				sizeX: 1,
				sizeY: 1,
				row: 0,
				col: 0
			}, {
				sizeX: 2,
				sizeY: 1,
				row: 0,
				col: 1
			}, {
				sizeX: 1,
				sizeY: 1,
				row: 1,
				col: 1
			}])
		}
	}, {
		sizeX: 2,
		sizeY: 2,
		row: 0,
		col: 2,
		content: {
			title: 'Top Middle',
			gridster: new ChildGridster([{
				sizeX: 2,
				sizeY: 1,
				row: 0,
				col: 0
			}, {
				sizeX: 1,
				sizeY: 1,
				row: 0,
				col: 2
			}])
		}
	}];

});
