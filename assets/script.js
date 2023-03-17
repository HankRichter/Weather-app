const cityInput = document.querySelector(".cityInput");
const searchButton = document.querySelector(".searchButton");
const dailyWeatherContainer = document.querySelector(".container3");
const currentCity = document.querySelector(".current-city");
const currentTemp = document.querySelector(".current-temp");
const currentWind = document.querySelector(".current-wind");
const currentHumidity = document.querySelector(".current-humidity");
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const weatherAPIKey = "&appid=3ea36f8f67b0fbc770aed01a9cb37854";
const imperialUnits = "&units=imperial";

function weatherFetcher() {
  const dailyWeather =
    weatherBaseURL + cityInput.value + imperialUnits + weatherAPIKey;

  fetch(dailyWeather, {
    cache: "reload",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const icon = document.createElement("img");
      currentCity.textContent = data.name + "" + data.weather[0].icon;
      currentTemp.textContent = "Temp:" + data.main.temp;
      currentWind.textContent = "Wind:" + data.wind.speed + " MPH";
      currentHumidity.textContent = "Humidity:" + data.main.humidity + " %";
    });
}

searchButton.addEventListener("click", weatherFetcher);
