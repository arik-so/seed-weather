/**
 * Created by arik on 2/17/15.
 */


seedApp.controller('ForecastController', function ($scope, $rootScope, $timeout, $http, WeatherData) {

    $scope.currentWeather = WeatherData.currentWeather;
    $scope.hourlyForecast = WeatherData.hourlyForecast;

    var init = function () {

        var cityIDs = $rootScope.configuration.cityIDs;

        var currentWeatherURL = 'http://api.openweathermap.org/data/2.5/group?id=' + cityIDs.join(','); // + '&units=metric';
        $http.get(currentWeatherURL).success(function (data, status, headers, config) {

            console.log(data);

            // add all the key/value pairs from data to the current weather object without overwriting it
            angular.extend($scope.currentWeather, data);

            console.log('Weather Data: ');
            console.log(WeatherData);

        });

        angular.forEach(cityIDs, function (currentCityID) {

            var hourlyForecastURL = 'http://api.openweathermap.org/data/2.5/forecast?id=' + currentCityID; // + '&units=metric';
            $http.get(hourlyForecastURL).success(function (data) {

                $scope.hourlyForecast[currentCityID] = data;

            });

        });

    };

    init();


});
