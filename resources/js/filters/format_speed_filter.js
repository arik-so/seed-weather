/**
 * Created by arik on 2/17/15.
 */


seedApp.filter('formatSpeed', function ($rootScope) {

    return function (number, unitSystem, addUnits) {

        // number is formatted in m/s
        var convertedNumber = number;
        var unitSign = 'm/s';

        if (unitSystem === 'metric') {

            // we need to calculate km/h
            convertedNumber = number * 3.6;
            unitSign = 'km/h';

        } else if (unitSystem === 'imperial') {

            // we need to calculate Fahrenheit
            convertedNumber = number * 2.23694; // according to Google
            unitSign = 'mph';

        }

        var response = Math.round(convertedNumber);

        if(addUnits){
            response += ' ' + unitSign;
        }

        return response;

    };

});
