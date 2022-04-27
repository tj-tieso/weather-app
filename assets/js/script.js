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

  // make a get request
  fetch(apiUrl)
    .then(function (response) {
      // if response is ok
      if (response.ok) {
        response.json().then(function (data) {
          displayCity(data, city);
          // console.log(data, city);
        });
      } else {
        alert("Could not find city, please try again");
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
var displayCity = function (weather, searchTerm) {
  console.log(weather);
  console.log(searchTerm);

  cityInputEl.textContent = "";
  searchedCity.textContent = searchTerm;
  cityTemp.textContent = weather.main.temp;
  cityWind.textContent = weather.wind.speed;
  cityHumidity.textContent = weather.main.humidity;
  // cityUv.textContent = weather.
};

userFormEl.addEventListener("submit", formSubmitHandler);
// getWeatherApi("Santiago");

// make API call
// Input data into Hero
// Store data in local storage
// generate "saved city" el

// replace current city when "saved city" is clicked
