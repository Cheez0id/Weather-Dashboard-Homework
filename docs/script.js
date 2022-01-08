var APIKey = "66e0e6cbc1682477b1950be5f8d0cbc0";
var currentWeatherResult = document.getElementById("currentWeather");

// city.value="Atlanta";
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={APIkey}
// console.log(city.value);

//a function that when called will run a query on weather API
function fetchWeather1() {
	var city = document.getElementById("city").value;
	var queryURL =
		"http://api.openweathermap.org/data/2.5/weather?q=" +
		city +
		"&appid=" +
		APIKey;
	// city=document.querySelector("#city").value
	fetch(queryURL)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log("hello, below you'll find the url");
			console.log(data);
			var queryResult = document.createElement("p");
			nameData = data.name;
      dateData = "date";
      conditionIconData = "conditions";
      temperatureData = data.main.temp;
      humidityData = "humidity";
      windSpeedData = data.wind.speed + data.wind.deg + data.wind.gust;
      uvData = "UV";
			queryResult.setAttribute("class", "weatherCurrent");
			queryResult.textContent = "City: " + nameData + " Date: " + dateData + " Conditions: " + conditionIconData + " Temp: " + temperatureData + " Humidity: " + humidityData + " Wind Conditions: " + windSpeedData + " UV: " + uvData;
			currentWeatherResult.append(queryResult);
			console.log(queryResult);
			// for (var i = 0; i <= data.length; i++) {
			// 	console.log(data[i]);
			// 	var cityResult = document.createElement("p");
			// 	cityResult.textContent = data[i];
			// 	currentWeatherResult.append(cityResult);
		});
}

//Added a search Button to run the function on click
document
	.getElementById("searchForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		console.log("you submitted on the form");
		fetchWeather1();
	});

//write an event listener and a query selector (the event listener will have a function inside of it) set a variable listening to that whole form
// addEventListener("submit",function(){}
