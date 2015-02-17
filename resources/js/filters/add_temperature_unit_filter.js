/**
 * Created by arik on 2/17/15.
 */

seedApp.filter('addTemperatureUnit', function ($rootScope) {

    return function (string) {

        if ($rootScope.units === 'metric') {
            return string + 'ºC';
        } else if ($rootScope.units === 'imperial') {
            return string + 'ºF';
        }

        return string + 'K';

    };

});
