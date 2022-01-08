var APIKey = "66e0e6cbc1682477b1950be5f8d0cbc0";
var currentWeatherResult = document.getElementById("currentWeather");
var dayToday = moment().format("dddd, MMMM Do YYYY");

// city.value="Atlanta";
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={APIkey}
// console.log(city.value);

//a function that when called will run a query on weather API
function fetchWeather1() {
	var city = document.getElementById("city").value;
	var queryURL =
		"http://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=imperial" +
		"&appid=" +
		APIKey;
	// city=document.querySelector("#city").value
	fetch(queryURL)
		.then(function (response) {
      if (response.status === 404){console.log("404 problem");
      var queryError = document.createElement("p");
      queryError.textContent="NO CITY FOUND BY THAT NAME, PLEASE TRY AGAIN.";
      currentWeatherResult.append(queryError)
    }
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			var queryResult = document.createElement("textarea");
			nameData = data.name;
			dateData = dayToday;
			conditionIconData =
				data.weather[0].main +
				", " +
				data.weather[0].description +
				" " +
				data.weather[0].icon;
			temperatureData = data.main.temp;
			humidityData = data.main.humidity;
			windSpeedData =
				"\n  Speed: " + data.wind.speed + "\n  Deg: " + data.wind.deg + "\n  Gust: " + data.wind.gust;
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
				"\n" +
				"Humidity: " +
				humidityData +
				"\n" +
				"Wind Conditions: " +
				windSpeedData +
				"\n" +
				"UV: " +
				uvData;
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
