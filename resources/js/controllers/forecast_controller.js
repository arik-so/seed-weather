/**
 * Created by arik on 2/17/15.
 */


seedApp.controller('ForecastController', function ($scope, $rootScope, $interval, $http, WeatherData) {

    $scope.currentWeather = WeatherData.currentWeather;
    $scope.hourlyForecast = WeatherData.hourlyForecast;
    $scope.dailyForecast = WeatherData.dailyForecast;

    function loadForecastData(){

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
            var dailyForecastURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + currentCityID;

            $http.get(hourlyForecastURL).success(function (data) {
                $scope.hourlyForecast[currentCityID] = data;
            });

            $http.get(dailyForecastURL).success(function(data){
                $scope.dailyForecast[currentCityID] = data;
            });


        });

    }

    var init = function () {

        loadForecastData();

    };

    init();

    $rootScope.$watch('configuration.cityIDs', function(newValue, oldValue){

        loadForecastData();

    }, true);

    $interval(function(){ // update the weather data every 15 minutes
        loadForecastData();
    }, 15 * 1000 * 60);

});
