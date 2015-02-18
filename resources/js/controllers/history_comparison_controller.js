/**
 * Created by arik on 2/17/15.
 */


seedApp.controller('HistoryComparisonController', function ($scope, $rootScope, $http, $filter, WeatherData, ViewMode) {

    $scope.viewMode = ViewMode;

    $scope.$watch('viewMode.preselectedCities', function (newValue, oldValue) {

        if (newValue.length == 2) { // we need to load the current data

            $scope.myData = [];

            $scope.historicalData = {};

            loadHistoricalData();

        }

    }, true);

    $rootScope.$watch('configuration.units', function (newValue, oldValue) {

        reformatData();

    }, true);


    function loadHistoricalData() {

        var cityIDs = $scope.viewMode.preselectedCities;

        angular.forEach(cityIDs, function (currentCityID) {

            var historyURL = 'http://api.openweathermap.org/data/2.5/history/city?type=day&id=' + currentCityID + '&APPID=' + $rootScope.openWeatherMapAPIKey; // + '&units=metric';

            $http.get(historyURL).success(function (data) {
                $scope.historicalData[currentCityID] = data;
                prepareHistoricalData(currentCityID);
            });

        });

    }

    function reformatData() {

        $scope.myData = [];

        var cityIDs = $scope.viewMode.preselectedCities;

        angular.forEach(cityIDs, function (currentCityID) {

            prepareHistoricalData(currentCityID);

        });

    }

    function prepareHistoricalData(cityID) {

        var data = $scope.historicalData[cityID];

        var currentFlotData = [];

        for (var i = 0; i < data.list.length; i++) {

            var currentData = data.list[i];
            currentFlotData.push([currentData.dt * 1000, $filter('formatTemperature')(currentData.main.temp, $rootScope.configuration.units, false)]);
        }

        var currentFlotObject = {};
        currentFlotObject.data = currentFlotData;

        // unfortunately, the historical data API does not return the city names, so we need to look them up in different datasets we already know to be there. Not nice, but it works.
        currentFlotObject.label = WeatherData.hourlyForecast[data.city_id].city.name;

        $scope.myData.push(currentFlotObject);

    }


    $scope.dataset = [{data: [], yaxis: 1, label: "sin"}];
    $scope.options = {
        legend: {
            container: "#legend",
            show: true
        },
        xaxis: {
            mode: 'time'
        }
    };

    for (var i = 0; i < 14; i += 0.5) {
        $scope.dataset[0].data.push([i, Math.sin(i)]);
    }


});
