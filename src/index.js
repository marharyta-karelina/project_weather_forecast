function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) hour = `0${hour}`;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;

  return `${day} ${hour}:${minutes}`;
}

let currentDayTime = document.querySelector("#currentDayTime");
let currentTime = new Date();

currentDayTime.innerHTML = formatDate(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["SUN", "MON", "THU"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col">
            <div class="card card-day">
              <h5 class="forecast-day">${formatDay(forecastDay.dt)}</h5>
               <img 
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" 
                alt=""
                width="68px"
                class="forecast-icon"
                >
              <div class="weather-forecast-temperature">
                <span class="forecast-weather-max"> ${Math.round(
                  forecastDay.temp.max
                )}°
                 </span> 
                <span class="forecast-weather-min"> ${Math.round(
                  forecastDay.temp.min
                )}°
                </span>
              </div>    
            </div>
          </div>      
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `c6f8ef4575250284954db9f4dfa7a996`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function realTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemperatureCelsius = document.querySelector("#main-temperature");
  celsiusTemperature = response.data.main.temp;
  mainTemperatureCelsius.innerHTML = `${temperature}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  feelsTemperatureCelsius = response.data.main.feels_like;
  document.querySelector(".feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".weather_description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector(".emoji-main");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "42c195090748727a9b0a818ba660488c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(realTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#type-city").value;
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function currentLocation(position) {
  let apiKey = "42c195090748727a9b0a818ba660488c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(realTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function displayFahrenhaitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenhaitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenhaitTemperature);

  let feelsFahrenhaitTemperature = (feelsTemperatureCelsius * 9) / 5 + 32;

  let feelsTemperature = document.querySelector(".feels");
  feelsTemperature.innerHTML = Math.round(feelsFahrenhaitTemperature);
  let markFahrenhait = document.querySelector(".feels_mark_celsius");
  markFahrenhait.innerHTML = "°F";
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let feelsTemperature = document.querySelector(".feels");
  feelsTemperature.innerHTML = Math.round(feelsTemperatureCelsius);
  let markCelsius = document.querySelector(".feels_mark_celsius");
  markCelsius.innerHTML = "°C";
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenhaitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Lviv");
