/**
 * Created by arik on 2/17/15.
 */


seedApp.filter('formatTemperature', function ($rootScope) {

    return function (number, unitSystem, addUnits) {

        // number is formatted in Kelvin
        var convertedNumber = number;
        var unitSign = 'K';

        if (unitSystem === 'metric') {

            // we need to calculate celsius
            convertedNumber = number - 273.15;
            unitSign = 'ºC';

        } else if (unitSystem === 'imperial') {

            // we need to calculate Fahrenheit
            convertedNumber = (number - 273.15) * 1.8 + 32;
            unitSign = 'ºF';

        }

        var formattedTemperature = Math.round(convertedNumber);

        if(addUnits){
            formattedTemperature += unitSign;
        }

        return formattedTemperature;

    };

});
