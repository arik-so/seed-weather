/**
 * Created by arik on 2/17/15.
 */

seedApp.controller('ConfigurationController', function ($scope, $rootScope, $interval, $http, WeatherData) {

    $scope.currentWeather = WeatherData.currentWeather;
    $rootScope.openWeatherMapAPIKey = '720510d6fef1bfb8df8ad803ac5c2af6';
    $rootScope.cityNames = {};

    var init = function () {

        // this is the default configuration
        var configuration = {

            "cityIDs": [5128581, 2643743],
            "units": "metric"

        };
        var storedConfiguration;

        try {
            storedConfiguration = JSON.parse(window.localStorage['seed-weather-configuration']);
        }catch(e){}

        if(storedConfiguration){
            configuration = storedConfiguration;
        }

        $rootScope.configuration = configuration;

        $rootScope.configuration.cityIDs = configuration.cityIDs;
        $rootScope.configuration.units = configuration.units;
        saveConfiguration();

        loadTimestamp();

    };

    function saveConfiguration(){

        window.localStorage['seed-weather-configuration'] = JSON.stringify($rootScope.configuration);

    }

    function loadTimestamp(){
        $rootScope.timestamp = Date.now() / 1000;
    }

    init();

    $rootScope.$watch('configuration', function(newValue, oldValue){

        saveConfiguration();

    }, true);

    $interval(function(){ // update the current timestamp every minute (e. g. for automated background coloring)
        loadTimestamp();
    }, 60 * 1000);

    $scope.toggleUnits = function(units){

        $rootScope.configuration.units = units;

    };

    $scope.addCity = function(cityID){

        var index = $rootScope.configuration.cityIDs.indexOf(cityID);

        if(index == -1) {
            $rootScope.configuration.cityIDs.push(cityID);
            $scope.addCityQuery = null;
        }

    };

    $scope.removeCity = function(cityID){

        var index = $rootScope.configuration.cityIDs.indexOf(cityID);
        if(index > -1){
            $rootScope.configuration.cityIDs.splice(index, 1);
            $scope.addCityQuery = null;
        }

    };

    $scope.$watch('addCityQuery', function(newValue, oldValue){

        var searchURL = 'http://api.openweathermap.org/data/2.5/find?q=' + encodeURIComponent(newValue);
        $http.get(searchURL).success(function(data){

            console.log(data);
            $scope.searchResults = data;

        });

    });

});
