/**
 * Created by arik on 2/18/15.
 */

seedApp.controller('ViewSwitchController', function($scope, ViewMode){

    $scope.currentView = 'forecast';
    $scope.viewMode = ViewMode;

    $scope.toggleView = function(view){

        if(view === 'compareHistory'){

            // we first need to preselect the cities to compare
            $scope.viewMode.currentViewMode = 'preselection';
            console.log(ViewMode);

        }else if(view === 'forecast'){

            $scope.viewMode.currentViewMode = view;
            $scope.currentView = view;

            $scope.viewMode.preselectedCities = [];

        }

    };

    $scope.$watch('viewMode.preselectedCities', function(newValue, oldValue){

        if(newValue.length == 2){

            $scope.viewMode.currentViewMode = 'compareHistory';
            $scope.currentView = 'compareHistory';

        }

    }, true);

});
