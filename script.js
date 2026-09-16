//DOM elements
const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const errorMessage = document.querySelector("#error-message");
const weatherDisplay = document.querySelector("#weather-display");
const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");

//weather code mapping
const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  51: "Light drizzle",
  61: "Light rain",
  63: "Moderate rain",
  71: "Light snow",
  80: "Rain showers",
};

// event listeners for form submit
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = cityInput.value;
  cityInput.value = "";
  fetchWeather(city);
});

//the main async function
async function fetchWeather(city) {
  errorMessage.style.display = "none";
  weatherDisplay.style.display = "none";

  try {
    let geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
    );
    let geoData = await geoResponse.json();

    //check for server found city
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(
        "City not found. Please double check spelling of your city.",
      );
    }
    let latitude = geoData.results[0].latitude;
    let longitude = geoData.results[0].longitude;
    let actualCityName = geoData.results[0].name;

    //fetch weather using coordinates

    let weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
    );
    let weatherData = await weatherResponse.json();

    //now the data we need is getting by following

    let currentTemp = weatherData.current_weather.temperature;
    let currentCode = weatherData.current_weather.weathercode;
    let descText = weatherCodes[currentCode] || "Unknown weather";

    //update DOM elements

    cityName.textContent = actualCityName;
    temperature.textContent = `${currentTemp}°C`;
    description.textContent = descText;
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  }
}
