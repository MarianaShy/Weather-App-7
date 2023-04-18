
function formData(timeStamp){
	let date = new Date(timeStamp);
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;

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

};
function getLocation(position){
	let apiKeys = "b83c1d0ca2d9e65fec290817b578d80d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKeys}`;
	axios.get(`${apiUrl}&appid=${apiKeys}`).then(showWeather);
};
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);
search("New York");

function showFahrenheitTemperature (event) {
	event.preventDefault();
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 +32;
	document.querySelector("#main-temperature").innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsiusTemperature (event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	document.querySelector("#main-temperature").innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature); 

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature); 





























