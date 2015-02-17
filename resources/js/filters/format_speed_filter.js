/**
 * Created by arik on 2/17/15.
 */


seedApp.filter('formatSpeed', function ($rootScope) {

    return function (number) {

        // number is formatted in m/s
        var convertedNumber = number;

        if ($rootScope.units === 'metric') {

            // we need to calculate km/h
            convertedNumber = number * 3.6;

        } else if ($rootScope.units === 'imperial') {

            // we need to calculate Fahrenheit
            convertedNumber = number * 2.23694; // according to Google

        }

        return Math.round(convertedNumber);

    };

});
