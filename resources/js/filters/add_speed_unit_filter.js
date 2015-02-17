/**
 * Created by arik on 2/17/15.
 */

seedApp.filter('addSpeedUnit', function ($rootScope) {

    return function (string) {

        var spacedString = string + ' ';

        if ($rootScope.units === 'metric') {
            return spacedString + 'km/h';
        } else if ($rootScope.units === 'imperial') {
            return spacedString + 'mph';
        }

        return spacedString + 'm/s';

    };

});
