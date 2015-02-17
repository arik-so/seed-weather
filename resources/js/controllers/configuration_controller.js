/**
 * Created by arik on 2/17/15.
 */

seedApp.controller('ConfigurationController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    var init = function () {

        var defaultConfiguration = {

            "cityIDs": [5368361, 5380748, 5128581, 2643743, 293397, 295277],
            "units": "metric"

        };

        var usedConfiguration = defaultConfiguration;
        var storedConfiguration;

        try {
            storedConfiguration = JSON.parse(window.localStorage['seed-weather-configuration']);
        }catch(e){}

        if(storedConfiguration){
            usedConfiguration = storedConfiguration;
        }else{
            window.localStorage['seed-weather-configuration'] = JSON.stringify(defaultConfiguration);
        }

        $rootScope.cityIDs = usedConfiguration.cityIDs;
        $rootScope.units = usedConfiguration.units;

    };

    init();


}]);
