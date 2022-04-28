// api key = ec98aa86db3b155818673df4ee8db72f
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector(".city-search");
var cityCardEl = document.querySelector("#city-card");

var searchedCity = document.querySelector("#searched-city");
var cityTemp = document.querySelector("#city-temp");
var cityWind = document.querySelector("#city-wind");
var cityHumidity = document.querySelector("#city-humidity");
var cityUv = document.querySelector("#city-uv");

// API request
var getCityWeather = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=ec98aa86db3b155818673df4ee8db72f";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // get lat and lon for getForecast
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          getForecast(lat, lon);
          // input city name
          searchedCity.textContent = city;
        });
      } else {
        alert("Could not find city, please try again");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

var getForecast = function (lat, lon) {
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=hourly,minutely&units=imperial&appid=ec98aa86db3b155818673df4ee8db72f";

  fetch(forecastUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // console.log(data);
          displayForecast(data);
        });
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

// search bar
var formSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = cityInputEl.value.trim();
  // console.log(cityName);

  if (cityName) {
    getCityWeather(cityName);
    cityInputEl.value = "";
  } else {
    alert("Please enter valid city name");
  }
};

// display current weather
// var displayCity = function (weather, searchTerm) {
//   cityInputEl.textContent = "";
//   searchedCity.textContent = searchTerm;
// };

var displayForecast = function (data) {
  console.log(data);
  cityUv.textContent = data.current.uvi;
  cityTemp.textContent = data.current.temp;
  cityWind.textContent = data.current.wind_speed;
  cityHumidity.textContent = data.current.humidity;

  var forecast = data.daily[i];

  for (var i = 0; i < 4; i++) {}
};

userFormEl.addEventListener("submit", formSubmitHandler);
// getWeatherApi();

// Store data in local storage
// generate "saved city" el

// replace current city when "saved city" is clicked
