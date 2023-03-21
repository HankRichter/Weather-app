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
const currentIconImage = document.querySelector(".currentIconImage");
const date = document.querySelectorAll(".Date");
const fiveDayIcon = document.querySelectorAll(".fiveDayIcon");
const temp = document.querySelectorAll(".Temp");
const wind = document.querySelectorAll(".Wind");
const humidity = document.querySelectorAll(".Humidity");
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const weatherAPIKey = "&appid=3ea36f8f67b0fbc770aed01a9cb37854";
const imperialUnits = "&units=imperial";
const today = new Date();
let weatherDataArray = JSON.parse(localStorage.getItem("weather-data")) || [];

function formattedDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return month + "/" + day + "/" + year;
}

function iconBuilder(iconName) {
  return "http://openweathermap.org/img/w/" + iconName + ".png";
}

function postToLocalStorage(dataTooStore) {
  if (weatherDataArray) {
    weatherDataArray.push(dataTooStore);
    localStorage.setItem("weather-data", JSON.stringify(weatherDataArray));
  } else {
    const dataTooStoreArray = [];
    dataTooStoreArray.push(dataTooStore);
    localStorage.setItem("weather-data", JSON.stringify(dataTooStoreArray));
  }
}

function cityButtons() {
  const buttons = document.querySelectorAll(".container5 button");
  buttons.forEach((button) => {
    button.addEventListener("click", weatherDataReplace);
  });
}

function weatherDataReplace(e) {
  console.log(e);
  const matchToCity = weatherDataArray.filter(
    (value) => e.target.innerText === value.cityValue
  )[0];
  if (!matchToCity) {
    return;
  }
  currentContainer.style.display = "block";
  currentCity.textContent =
    matchToCity.dataForCurrentDay.name + "(" + formattedDate(today) + ")";
  currentIconImage.src = iconBuilder(
    matchToCity.dataForCurrentDay.weather[0].icon
  );
  currentIconImage.setAttribute(
    "alt",
    matchToCity.dataForCurrentDay.weather[0].description
  );
  currentTemp.textContent =
    "Temp: " + matchToCity.dataForCurrentDay.main.temp + " °F";
  currentWind.textContent =
    "Wind: " + matchToCity.dataForCurrentDay.wind.speed + " MPH";
  currentHumidity.textContent =
    "Humidity: " + matchToCity.dataForCurrentDay.main.humidity + " %";

  const filteredData = matchToCity.dataForFiveDay.list.filter(
    (value, index) => index === 6 || index % 8 === 6
  );
  console.log(filteredData);
  filteredData.forEach((item, index) => {
    fiveDayForecast.style.display = "flex";
    const fiveDayDate = new Date(item.dt_txt).toLocaleDateString("en-US");
    fiveDayIcon[index].src = iconBuilder(item.weather[0].icon);
    fiveDayIcon[index].setAttribute("alt", item.weather[0].description);
    date[index].textContent = fiveDayDate;
    const fiveDayTemp = item.main.temp;
    temp[index].textContent = "Temp: " + fiveDayTemp + " °F";
    const fiveDayWind = item.wind.speed;
    wind[index].textContent = "Wind: " + fiveDayWind + " MPH";
    const fiveDayHumidity = item.main.humidity;
    humidity[index].textContent = "Humidity: " + fiveDayHumidity + " %";
  });
}

function setUpApp() {
  if (weatherDataArray.length) {
    weatherDataArray.forEach((item) => {
      const button = document.createElement("button");
      oldSearchResults.appendChild(button);
      button.textContent = item.cityValue;
    });
    cityButtons();
  }
}

function weatherFetcher() {
  const dataTooStore = {
    dataForCurrentDay: null,
    dataForFiveDay: null,
    cityValue: cityInput.value,
  };
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
      dataTooStore.dataForCurrentDay = data;
      const button = document.createElement("button");
      oldSearchResults.appendChild(button);
      button.textContent = data.name;
      currentContainer.style.display = "block";
      currentCity.textContent = data.name + "(" + formattedDate(today) + ")";
      currentIconImage.src = iconBuilder(data.weather[0].icon);
      currentIconImage.setAttribute("alt", data.weather[0].description);
      currentTemp.textContent = "Temp: " + data.main.temp + " °F";
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
          dataTooStore.dataForFiveDay = dataFor5Day;
          fiveDayForecast.style.display = "flex";
          const filteredData = dataFor5Day.list.filter(
            (value, index) => index === 6 || index % 8 === 6
          );
          console.log(filteredData);
          filteredData.forEach((item, index) => {
            const fiveDayDate = new Date(item.dt_txt).toLocaleDateString(
              "en-US"
            );
            fiveDayIcon[index].src = iconBuilder(data.weather[0].icon);
            fiveDayIcon[index].setAttribute("alt", data.weather[0].description);
            console.log(fiveDayDate);
            date[index].textContent = fiveDayDate;
            console.log(date);
            const fiveDayTemp = item.main.temp;
            console.log(fiveDayTemp);
            temp[index].textContent = "Temp: " + fiveDayTemp + " °F";
            console.log(temp);
            const fiveDayWind = item.wind.speed;
            console.log(fiveDayWind);
            wind[index].textContent = "Wind: " + fiveDayWind + " MPH";
            console.log(wind);
            const fiveDayHumidity = item.main.humidity;
            console.log(fiveDayHumidity);
            humidity[index].textContent = "Humidity: " + fiveDayHumidity + " %";
            console.log(humidity);

            button.addEventListener("click", weatherDataReplace);
          });
          postToLocalStorage(dataTooStore);
          weatherDataArray =
            JSON.parse(localStorage.getItem("weather-data")) || [];
        });
    });
}

searchButton.addEventListener("click", weatherFetcher);
setUpApp();
