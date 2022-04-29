// api key = ec98aa86db3b155818673df4ee8db72f
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector(".city-search");
var cityCardEl = document.querySelector("#city-card");

// hero variables
var searchedCity = document.querySelector("#searched-city");
var cityTemp = document.querySelector("#city-temp");
var cityWind = document.querySelector("#city-wind");
var cityHumidity = document.querySelector("#city-humidity");
var cityUv = document.querySelector("#city-uv");

// forecast variables
// var forecastDate = document.querySelector("#forecast-date")
var forecastTemp = document.querySelector(".forecast-temp");
var forecastWind = document.querySelector(".forecast-wind");
var forecastHumidity = document.querySelector(".forecast-humidity");

var cityArr = [];

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

var displayForecast = function (data) {
  //   console.log(data);
  cityUv.textContent = data.current.uvi;
  cityTemp.textContent = data.current.temp;
  cityWind.textContent = data.current.wind_speed;
  cityHumidity.textContent = data.current.humidity;

  // empty div before appending info
  $(".forecast-container").empty();

  for (var i = 1; i < 6; i++) {
    // console.log(data.daily[i]);
    var dateDisplay = moment.unix(data.daily[i].dt).format("ddd, MMM, Do");
    // console.log(dateDisplay);
    var forecastCol = $("<div>").addClass("col-2");
    var forecastCard = $("<div>").addClass("card forecast-card forecast-text");
    var cardBody = $("<div>").addClass("card-body");
    //
    var forecastDate = $("<div>")
      .attr("id", "forecast-date")
      .addClass("card-title")
      .text(dateDisplay);
    var forecastTemp = $("<p>")
      .addClass("card-text")
      .text(
        "Temp:" +
          Math.round(data.daily[i].temp.day) +
          String.fromCharCode(186) +
          "F"
      );
    var forecastWind = $("<p>")
      .addClass("card-text")
      .text(data.daily[i].wind_speed);
    var forecastHumidity = $("<p>")
      .addClass("card-text")
      .text(data.daily[i].humidity);

    // appened variables to cointainer
    $(".forecast-container").append(
      forecastCol.append(
        forecastCard.append(
          cardBody.append(
            forecastDate,
            forecastTemp,
            forecastWind,
            forecastHumidity
          )
        )
      )
    );
  }
};

// search bar
var formSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = cityInputEl.value.trim();
  // console.log(cityName);

  if (cityName) {
    getCityWeather(cityName);
    saveCity(cityName);
    cityInputEl.value = "";
  } else {
    alert("Please enter valid city name");
  }
};

var saveCity = function (cityName) {
  cityArr.push(cityName);
  localStorage.setItem("city", cityArr);
  // create button
  var cityBtn = $("<button>")
    .addClass("btn btn-light")
    .attr("id", "city-btn")
    .text(cityName);
  $(".save-container").append(cityBtn);
};

// click saved city button to display city weather
$(document).on("click", "#city-btn", function () {
  var cityText = $("#city-btn").text();
  // console.log(cityText);
  getCityWeather(cityText);
});

// load last city and buttons from localStorage
var loadCities = function () {
  var tempArr = localStorage.getItem("city");
  var retrievedCities = JSON.parse(tempArr);
  console.log(retrievedCities);
  // for (var i = 0; i < retrievedCities.length; i++) {
  //   // var name = tempArr[i];
  //   var cityBtn = $("<button>")
  //     .addClass("btn btn-light")
  //     .attr("id", "city-btn")
  //     .text(name);
  //   $(".save-container").append(cityBtn);
  // }
};
// // add limit to how many cities can be stored
loadCities();

userFormEl.addEventListener("submit", formSubmitHandler);
