var APIKey = "66e0e6cbc1682477b1950be5f8d0cbc0";
//TODO:Second API key was generated for second function, but 401 error (http://openweathermap.org/faq#error401)
var APIKey2 = "d0b186f2faa3501d4dd89f66a5cdf85f";

var currentWeatherResult = document.getElementById("currentWeather");
var coordHider = document.getElementById("invisibleData");
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
			latData = data.coord.lat;
			lonData = data.coord.lon;
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
			console.log(latData + "&lon=" + lonData + " " + city);
			//trying to make coordinates pull from data usable to other function
			//original plan was to use local
			cityCoordinates = latData + "&lon=" + lonData;
			localStorage.setItem("coordinates", cityCoordinates);
			//new plan to make an element to pull form
			var coordHolder = document.createElement("div");
			coordHolder.setAttribute("class", "coordText");
			coordHolder.textContent = latData + "&lon=" + lonData;
			coordHider.append(coordHolder);
			console.log(coordHider);
		});
}

function fetchWeather2() {
	// var cityCoord = localStorage.getItem("coordinates"); THIS IS WHERE I AM STUCK; TRYING TO GRAB INNERTEXTVALUE
	var cityCoord = document.getElementsByClassName("coordText");
	var coordText = cityCoord.innerText;
	console.log(cityCoord);
	console.log(coordText);

	var queryOneCallUrl =
		"https://api.openweathermap.org/data/2.5/onecall?lat=" +
		cityCoord +
		"&exclude=hourly&appid=" +
		APIKey2;
	fetch(queryOneCallUrl)
		.then(function (response) {
			console.log("the oneCall is working and mary is still great");
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

// =================IGNORE BELOW ================

//write an event listener and a query selector (the event listener will have a function inside of it) set a variable listening to that whole form
// addEventListener("submit",function(){}

// fetchWeatherObsolete();
//TODO: make sure to look at https://openweathermap.org/api/one-call-api and at https://openweathermap.org/api/geocoding-api This fetch is here to pull lat/long info for teh city so that we can put that into fetchweather3call

// function fetchWeatherObsolete() {
// 	var city = document.getElementById("city").value;
//   var geoLocation = "http://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=3&appid=" + APIKey;

// 		fetch(geoLocation)
// 		.then(function (response) {
// 			console.log(
// 				"working on 5 day forecast function and also mary is awesome"
// 			);
// 			return response.json();
// 		})
// 		.then(function (data) {
// 			console.log(data);

// 		});
// }
