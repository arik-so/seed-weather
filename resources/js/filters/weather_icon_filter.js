/**
 * Created by arik on 2/17/15.
 */

seedApp.filter('weatherIcon', function () {

    return function (iconCode) {

        return 'http://openweathermap.org/img/w/' + iconCode + '.png';

    };

});
