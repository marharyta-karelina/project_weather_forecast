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

function realTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemperatureCelsius = document.querySelector("#main-temperature");
  mainTemperatureCelsius.innerHTML = `${temperature}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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
}
function search(city) {
  let apiKey = "42c195090748727a9b0a818ba660488c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(realTemperature);
  console.log(apiUrl);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#type-city").value;
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Lviv");
