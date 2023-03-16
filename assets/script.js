const cityInput = document.querySelector(".cityInput")
const searchButton = document.querySelector(".searchButton")
const dailyWeatherContainer = document.querySelector(".container3")
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?q="
const weatherAPIKey = "&appid=3ea36f8f67b0fbc770aed01a9cb37854"
const imperialUnits = "&units=imperial"

function weatherFetcher(){

    const dailyWeather = weatherBaseURL + cityInput.value + imperialUnits + weatherAPIKey

    fetch(dailyWeather, {
    cache: 'reload',
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}

searchButton.addEventListener("click", weatherFetcher);