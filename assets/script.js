const cityInput = document.querySelector(".cityInput");
const searchButton = document.querySelector(".searchButton");
const dailyWeatherContainer = document.querySelector(".container3");
const oldSearchResults = document.querySelector(".container5");
const fiveDayForecast = document.querySelector(".container6");
const currentCity = document.querySelector(".current-city");
const currentTemp = document.querySelector(".current-temp");
const currentWind = document.querySelector(".current-wind");
const currentHumidity = document.querySelector(".current-humidity");
const currentContainer = document.querySelector(".current-container");
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const weatherAPIKey = "&appid=3ea36f8f67b0fbc770aed01a9cb37854";
const imperialUnits = "&units=imperial";
const today = dayjs().format("MM/DD/YYYY");

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
      const button = document.createElement("button");
      oldSearchResults.appendChild(button);
      button.textContent = data.name;
      currentContainer.style.display = "block";
      const icon = document.createElement("img");
      currentCity.textContent =
        data.name + "(" + today + ")" + data.weather[0].icon;
      currentTemp.textContent = "Temp:" + data.main.temp;
      currentWind.textContent = "Wind:" + data.wind.speed + " MPH";
      currentHumidity.textContent = "Humidity:" + data.main.humidity + " %";

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      const fiveDayURL =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        weatherAPIKey +
        imperialUnits +
        "&cnt=5";

      fetch(fiveDayURL, {
        cache: "reload",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (dataFor5Day) {
          console.log(dataFor5Day);
          fiveDayForecast.style.display = "block";
        });
    });
}

searchButton.addEventListener("click", weatherFetcher);
