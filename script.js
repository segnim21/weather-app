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
