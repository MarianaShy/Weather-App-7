
function formData(timeStamp){
	let date = new Date(timeStamp);
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;

}

//forecast
function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[day];
}

function displayForecast(response) {

let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast-item");
let forecastHTML = "";

forecast.forEach(function(forecastDay, index){
	if (index < 5 ) {
	forecastHTML = forecastHTML + 
	`<div class="forecast__item" >
	<div class="forecast__day">
	${formatDay(forecastDay.dt)}
	</div>
	<img src=http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png alt="icon" class="forecast__logo" id="forecast-logo">
	<div class="forecast__temperature">
	<span class="forecast__max-temp" id="forecast-min-temp">${Math.round(forecastDay.temp.max)}</span>
	<span class="forecast__min-temp" id="forecast-max-temp">${Math.round(forecastDay.temp.min)}</span>
	</div>
	</div>`;
	
	forecastElement.innerHTML = forecastHTML;
}
});


}

//search engine
function search(city){
let apiKeys = "b83c1d0ca2d9e65fec290817b578d80d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
	axios.get(`${apiUrl}&appid=${apiKeys}`).then(showWeather);
};
function handleSubmit (event) {
	event.preventDefault();
	let city = document.querySelector("#search-input").value;
	search(city);
};

function getForecast(coordinates) {

let apiKeys = "bb0df6985c2eab6a171d64a6bacbb4e1";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKeys}`;
axios.get(apiUrl).then(displayForecast);
}


function showWeather(response) {
	celsiusTemperature = response.data.main.temp;
	document.querySelector("#main-temperature").innerHTML = Math.round(celsiusTemperature);
	document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
	document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
	document.querySelector("#sky").innerHTML = response.data.weather[0].description;
	document.querySelector("h1").innerHTML = response.data.name;
	document.querySelector("#date").innerHTML = formData(response.data.dt * 1000);
	let mainIcon = document.querySelector("#main-icon");
	mainIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	mainIcon.setAttribute("alt", response.data.weather[0].main);

	getForecast(response.data.coord);
};
function getLocation(position){
	let apiKeys = "b83c1d0ca2d9e65fec290817b578d80d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKeys}`;
	axios.get(`${apiUrl}&appid=${apiKeys}`).then(showWeather);
};
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);
search("New York");

let celsiusTemperature = null;

































