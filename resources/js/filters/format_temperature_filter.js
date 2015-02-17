/**
 * Created by arik on 2/17/15.
 */


seedApp.filter('formatTemperature', function ($rootScope) {

    return function (number) {

        // number is formatted in Kelvin
        var convertedNumber = number;

        if ($rootScope.units === 'metric') {

            // we need to calculate celsius
            convertedNumber = number - 273.15;

        } else if ($rootScope.units === 'imperial') {

            // we need to calculate Fahrenheit
            convertedNumber = (number - 273.15) * 1.8 + 32;

        }

        return Math.round(convertedNumber);

    };

});
