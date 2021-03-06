/**
 * Created by arik on 2/17/15.
 */


seedApp.controller('ForecastController', function ($scope, $rootScope, $interval, $http, WeatherData, ViewMode) {

    $scope.currentWeather = WeatherData.currentWeather;
    $scope.hourlyForecast = WeatherData.hourlyForecast;
    $scope.dailyForecast = WeatherData.dailyForecast;

    $scope.viewMode = ViewMode;

    function loadForecastData(){

        var cityIDs = $rootScope.configuration.cityIDs;

        var currentWeatherURL = '//api.openweathermap.org/data/2.5/group?id=' + cityIDs.join(',') + '&APPID=' + $rootScope.openWeatherMapAPIKey; // + '&units=metric';
        $http.get(currentWeatherURL).success(function (data, status, headers, config) {

            console.log(data);

            // add all the key/value pairs from data to the current weather object without overwriting it
            angular.extend($scope.currentWeather, data);

            console.log('Weather Data: ');
            console.log(WeatherData);

        });

        angular.forEach(cityIDs, function (currentCityID) {

            var hourlyForecastURL = '//api.openweathermap.org/data/2.5/forecast?id=' + currentCityID + '&APPID=' + $rootScope.openWeatherMapAPIKey; // + '&units=metric';
            var dailyForecastURL = '//api.openweathermap.org/data/2.5/forecast/daily?id=' + currentCityID + '&APPID=' + $rootScope.openWeatherMapAPIKey;

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


    $scope.togglePreselection = function(cityID){

        var index = $scope.viewMode.preselectedCities.indexOf(cityID);
        if(index == -1){
            $scope.viewMode.preselectedCities.push(cityID);
        }else{
            $scope.viewMode.preselectedCities.splice(index, 1);
        }

    }

});
