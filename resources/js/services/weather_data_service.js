/**
 * Created by arik on 2/17/15.
 */

seedApp.service('WeatherData', function WeatherData(){

    var weatherData = this;
    weatherData.currentWeather = {};
    weatherData.hourlyForecast = {};
    weatherData.dailyForecast = {};

});
