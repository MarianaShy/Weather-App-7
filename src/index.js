


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
	document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
	document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
	document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
	document.querySelector("#sky").innerHTML = response.data.weather[0].main;
	document.querySelector("h1").innerHTML = response.data.name;
	console.log(response.data);
};
function getLocation(position){
	let apiKeys = "b83c1d0ca2d9e65fec290817b578d80d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKeys}`;
	axios.get(`${apiUrl}&appid=${apiKeys}`).then(showWeather);
};
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);
search("New York");






























