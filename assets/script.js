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
const date = document.querySelectorAll(".Date")
const temp = document.querySelectorAll(".Temp")
const wind = document.querySelectorAll(".Wind")
const humidity = document.querySelectorAll(".Humidity")
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
      currentTemp.textContent = "Temp: " + data.main.temp + " F"
      currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
      currentHumidity.textContent = "Humidity: " + data.main.humidity + " %";

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      const fiveDayURL =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        weatherAPIKey +
        imperialUnits;

      fetch(fiveDayURL, {
        cache: "reload",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (dataFor5Day) {
          console.log(dataFor5Day);
          fiveDayForecast.style.display = "block";
          const filteredData = dataFor5Day.list.filter((value, index) =>
          index === 6 || index % 8 === 6) 
          console.log(filteredData);
        filteredData.forEach((item , index) =>{
            const fiveDayDay = item.dt_txt;
            console.log(fiveDayDay);
            date[index].textContent = fiveDayDay
            console.log(date);
            const fiveDayTemp = item.main.temp
            console.log(fiveDayTemp);
            temp[index].textContent = "Temp: " + fiveDayTemp
            console.log(temp);
            const fiveDayWind = item.wind.speed
            console.log(fiveDayWind);
            wind[index].textContent = "Wind: " + fiveDayWind + " MPH";
            console.log(wind);
            const fiveDayHumidity = item.main.humidity
            console.log(fiveDayHumidity);
            humidity[index].textContent = "Humidity: " + fiveDayHumidity + " %";
            console.log(humidity);
            })
        });
    });
}

searchButton.addEventListener("click", weatherFetcher);
