var APIKey = "66e0e6cbc1682477b1950be5f8d0cbc0";
//TODO:Second API key was generated for second function, but 401 error (http://openweathermap.org/faq#error401)
var APIKey2 = "d0b186f2faa3501d4dd89f66a5cdf85f";

var currentWeatherResult = document.getElementById("currentWeather");
var dayToday = moment().format("dddd, MMMM Do YYYY");

// city.value="Atlanta";
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={APIkey}
// console.log(city.value);

//a function that when called will run a query on weather API
function fetchWeather1() {
	var city = document.getElementById("city").value;
	var queryURL =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		city +
		"&units=imperial" +
		"&appid=" +
		APIKey;
	fetch(queryURL)
		.then(function (response) {
			if (response.status === 404) {
				console.log("404 problem");
				var queryError = document.createElement("p");
				queryError.textContent =
					"NO CITY FOUND BY THAT NAME, PLEASE TRY AGAIN.";
				currentWeatherResult.append(queryError);
			} else if (city === "") {
				var queryError = document.createElement("p");
				queryError.textContent =
					"NO CITY FOUND BY THAT NAME, PLEASE TRY AGAIN.";
				currentWeatherResult.append(queryError);
			}
			return response.json();
		})
		.then(function (data) {
			var queryResult = document.createElement("textarea");
			//TODO: make the weather icons work - https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
			iconImage = document.createElement("img");
			nameData = data.name;
			dateData = dayToday;
			conditionIconData =
				data.weather[0].main +
				", " +
				data.weather[0].description +
				" " +
				data.weather[0].icon +
				iconImage;
			temperatureData = data.main.temp;
			humidityData = data.main.humidity;
			windSpeedData =
				"\n  Speed: " +
				data.wind.speed +
				"\n  Deg: " +
				data.wind.deg +
				"\n  Gust: " +
				data.wind.gust;
			//TODO: figure out how to find and calculate/display UV information
			uvData = "UV";
			queryResult.setAttribute("class", "weatherCurrent");
			queryResult.textContent =
				"City: " +
				nameData +
				"\n" +
				"Date: " +
				dateData +
				"\n" +
				"Conditions: " +
				conditionIconData +
				"\n" +
				"Temp: " +
				temperatureData +
				" F\n" +
				"Humidity: " +
				humidityData +
				"%\n" +
				"Wind Conditions: " +
				windSpeedData +
				"\n" +
				"UV: " +
				uvData;
			currentWeatherResult.append(queryResult);
			// for (var i = 0; i <= data.length; i++) {
			// 	console.log(data[i]);
			// 	var cityResult = document.createElement("p");
			// 	cityResult.textContent = data[i];
			// 	currentWeatherResult.append(cityResult);
		});
}

function fetchWeather2() {
	var city = document.getElementById("city").value;
  var geoLocation = "http://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=3&appid=" + APIKey;
  console.log(geoLocation);
	var queryURL5 =
  "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily" +	"&appid=" + APIKey2;

		fetch(queryURL5)
		.then(function (response) {
			console.log(
				"working on 5 day forecast function and also mary is awesome"
			);
			return response.json();
		})
		.then(function (data) {
			console.log(data);
		});
}

//Added a search Button to run the function on click
document.getElementById("search").addEventListener("click", function (event) {
	event.preventDefault();
	console.log("you submitted on the form");
	fetchWeather1();
	fetchWeather2();
});

//write an event listener and a query selector (the event listener will have a function inside of it) set a variable listening to that whole form
// addEventListener("submit",function(){}
