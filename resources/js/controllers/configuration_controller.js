/**
 * Created by arik on 2/17/15.
 */

seedApp.controller('ConfigurationController', function ($scope, $rootScope, $interval, $http, WeatherData) {

    $scope.currentWeather = WeatherData.currentWeather;

    var init = function () {

        var configuration = {

            "cityIDs": [5368361, 5380748, 5128581, 2643743, 293397, 295277],
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

    $interval(function(){ // updating the timestamp every minute should suffice
        loadTimestamp();
    }, 60000);

    $scope.toggleUnits = function(units){

        $rootScope.configuration.units = units;

    };

    $scope.$watch('addCityQuery', function(newValue, oldValue){

        var searchURL = 'http://api.openweathermap.org/data/2.5/find?q=' + encodeURIComponent(newValue);
        $http.get(searchURL).success(function(data){

            console.log(data);
            $scope.searchResults = data;

        });



    });

});
