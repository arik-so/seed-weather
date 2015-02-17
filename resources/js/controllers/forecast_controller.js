/**
 * Created by arik on 2/17/15.
 */


seedApp.controller('ForecastController', ['$scope', '$rootScope', '$timeout', '$http', function ($scope, $rootScope, $timeout, $http) {

    $scope.weatherDetails = {};
    $scope.hourlyForecast = {};

    var init = function () {

        var cityIDs = $rootScope.cityIDs;

        var currentWeatherURL = 'http://api.openweathermap.org/data/2.5/group?id=' + cityIDs.join(','); // + '&units=metric';
        $http.get(currentWeatherURL).success(function (data, status, headers, config) {

            console.log(data);
            $scope.weatherDetails = data;

        });

        angular.forEach(cityIDs, function (currentCityID) {

            var hourlyForecastURL = 'http://api.openweathermap.org/data/2.5/forecast?id=' + currentCityID; // + '&units=metric';
            $http.get(hourlyForecastURL).success(function (data) {

                $scope.hourlyForecast[currentCityID] = data;

            });

        });

    };

    init();


}]);
