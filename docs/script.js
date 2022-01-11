var APIKey = "66e0e6cbc1682477b1950be5f8d0cbc0";
//TODO:Second API key was generated for second function, but 401 error (http://openweathermap.org/faq#error401)
var APIKey2 = "d0b186f2faa3501d4dd89f66a5cdf85f";

var currentWeatherResult = document.getElementById("currentWeather");
var tomorrowResult = document.getElementById("tomorrowcard");
var day1result = document.getElementById("day1card");
var day2result = document.getElementById("day2card");
var day3result = document.getElementById("day3card");
var day4result = document.getElementById("day4card");

var coordHider = document.getElementById("invisibleData");
var dayToday = moment().format("dddd, MMMM Do YYYY");
var weatherIcon= document.querySelector(".weatherIcon");

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
				var queryError = document.createElement("ul");
				queryError.textContent =
					"NO CITY FOUND BY THAT NAME, PLEASE TRY AGAIN.";
				currentWeatherResult.append(queryError);
			} else if (city === "") {
				var queryError = document.createElement("p");
				queryError.textContent =
					"NO CITY SEARCHED.";
				currentWeatherResult.append(queryError);
			}
			return response.json();
		})
		.then(function (data) {
			var queryResult = document.createElement("p");
			iconImage = document.createElement("img");
			iconImage.setAttribute("src", "http://openweathermap.org/img/wn/"+ data.weather[0].icon + "@2x.png");
			weatherIcon.append(iconImage);

			nameData = data.name;
			dateData = dayToday;
			conditionIconData =
				data.weather[0].main +
				", " +
				data.weather[0].description +
				" " 
				temperatureData = data.main.temp;
			humidityData = data.main.humidity;
			windSpeedData =
				"Speed: " +
				data.wind.speed +
				", Deg: " +
				data.wind.deg +
				", Gust: " +
				data.wind.gust;
			//TODO: figure out how to find and calculate/display UV information
			uvData = "UV";
			window.latData = data.coord.lat;
			window.lonData = data.coord.lon;
			queryResult.setAttribute("class", "weatherCurrent");
			queryResult.innerHTML =
				"City: " +
				//think about adding state and zip?
				nameData +
				"<br>" +
				"Date: " +
				dateData +
				"<br>" +
				"Conditions: " +
				conditionIconData +
				"<br>" +
				"Temp: " +
				temperatureData +
				" F<br>" +
				"Humidity: " +
				humidityData +
				"%<br>" +
				"Wind Conditions: " + "<br>" +
				windSpeedData +
				"<br>" +
				"UV: " +
				uvData;
			currentWeatherResult.append(queryResult);
			console.log(latData + "&lon=" + lonData + " " + city);
			//trying to make coordinates pull from data usable to other function
			//original plan was to use local storage
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

//A function to take the lat/long data that was saved on the page to put it into a OneCall function to try to get daily weather
function fetchWeather2() {
	// var cityCoord = localStorage.getItem("coordinates"); THIS IS WHERE I AM STUCK; TRYING TO GRAB INNERTEXTVALUE
	var city = document.getElementById("city").value;
	var cityCoord = document.getElementsByClassName("coordText");
	console.log(cityCoord);
	//  console.log(cityCoord.div.coordText.length);
	//TODO: Do I really have to make the lat/long 00.00 vs 00.0000??
	//  placeholderCoord = "39.7392&lon=-104.9847";
	var queryOneCallUrl =
		"https://api.openweathermap.org/data/2.5/forecast?q=" +city+ "&appid="+
		APIKey2;
	fetch(queryOneCallUrl)
		.then(function (response2) {
			console.log("the oneCall is working and mary is still great");
			return response2.json();
		})
		.then(function (data2) {
			console.log(data2);
			console.log(window.latData); console.log(window.lonData);

			// console.log(data.daily[0]);
			//MARY WHY DONT YOU JUST MAKE A FOR LOOP FOR THESE?
			var day0 = document.createElement("textarea");
			day0.setAttribute("class", "day0result");
			day0.textContent =
				"Tomorrow" +
				"\n" +
				"Temp: " +
				data.daily[0].temp.day +
				" F\n" +
				"Conditions: " +
				data.daily[0].weather[0].description +
				"\n" +
				"Humidity: " +
				data.daily[0].humidity +
				"%\n";
			tomorrowResult.append(day0);

			var day1 = document.createElement("textarea");
			day1.setAttribute("class", "day1result");
			day1.textContent =
				"day after tomorrow: " +
				"\n" +
				"Temp: " +
				data.daily[1].temp.day +
				" F\n" +
				"Conditions: " +
				data.daily[1].weather[0].description +
				"\n" +
				"Humidity: " +
				data.daily[1].humidity +
				"%\n";
			day1result.append(day1);

			var day2 = document.createElement("textarea");
			day2.setAttribute("class", "day1result");
			day2.textContent =
				"2nd day after tomorrow: " +
				"\n" +
				"Temp: " +
				data.daily[2].temp.day +
				" F\n" +
				"Conditions: " +
				data.daily[2].weather[0].description +
				"\n" +
				"Humidity: " +
				data.daily[2].humidity +
				"%\n";
			day2result.append(day2);

			var day3 = document.createElement("textarea");
			day3.setAttribute("class", "day1result");
			day3.textContent =
				"3rd day after tomorrow: " +
				"\n" +
				"Temp: " +
				data.daily[3].temp.day +
				" F\n" +
				"Conditions: " +
				data.daily[3].weather[0].description +
				"\n" +
				"Humidity: " +
				data.daily[3].humidity +
				"%\n";
			day3result.append(day3);

			var day4 = document.createElement("textarea");
			day4.setAttribute("class", "day1result");
			day4.textContent =
				"4th day after tomorrow: " +
				"\n" +
				"Temp: " +
				data.daily[4].temp.day +
				" F\n" +
				"Conditions: " +
				data.daily[4].weather[0].description +
				"\n" +
				"Humidity: " +
				data.daily[4].humidity +
				"%\n";
			day4result.append(day4);

			var day5 = document.createElement("textarea");
			day5.setAttribute("class", "day1result");
			day5.textContent =
				"5th day after tomorrow: " +
				"\n" +
				"Temp: " +
				data.daily[5].temp.day +
				" F\n" +
				"Conditions: " +
				data.daily[5].weather[0].description +
				"\n" +
				"Humidity: " +
				data.daily[5].humidity +
				"%\n";
			day5result.append(day5);
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
