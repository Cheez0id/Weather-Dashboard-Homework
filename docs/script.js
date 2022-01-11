var APIKey = "66e0e6cbc1682477b1950be5f8d0cbc0";
var APIKey2 = "d0b186f2faa3501d4dd89f66a5cdf85f";

var currentWeatherResult = document.getElementById("currentWeather");
var tomorrowResult = document.getElementById("tomorrowcard");
var day3result = document.getElementById("day3card");
var day4result = document.getElementById("day4card");
var day5result = document.getElementById("day5card");
var day6result = document.getElementById("day6card");

var coordHider = document.getElementById("invisibleData");
var dayToday = moment().format("dddd, MMMM Do YYYY");
var weatherIcon = document.querySelector(".weatherIcon");

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
		//Error Handling
		.then(function (response) {
			if (response.status === 404) {
				console.log("404 problem");
				var queryError = document.createElement("ul");
				queryError.textContent =
					"NO CITY FOUND BY THAT NAME, PLEASE TRY AGAIN.";
				currentWeatherResult.append(queryError);
			} else if (city === "") {
				var queryError = document.createElement("p");
				queryError.textContent = "NO CITY SEARCHED.";
				currentWeatherResult.append(queryError);
			}
			//create json object from resonse data
			return response.json();
		})
		.then(function (data) {
			//create a <p> section for the results and append results to section
			var queryResult = document.createElement("p");
			
			iconImage = document.createElement("img");
			iconImage.setAttribute(
				"src",
				"http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
			);
			weatherIcon.append(iconImage);
			nameData = data.name;
			dateData = dayToday;
			conditionIconData =
				data.weather[0].main + ", " + data.weather[0].description + " ";
			temperatureData = data.main.temp;
			humidityData = data.main.humidity;
			windSpeedData =
				"Speed: " +
				data.wind.speed +
				", Deg: " +
				data.wind.deg +
				", Gust: " +
				data.wind.gust;
			//TODO: figure out how to FIX UV
			window.latData = data.coord.lat;
			window.lonData = data.coord.lon;
			queryResult.setAttribute("class", "weatherCurrent");
			queryResult.setAttribute("class", "font-bold");
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
				"Wind Conditions: " +
				"<br>" +
				windSpeedData +
				"<br>";
			currentWeatherResult.append(queryResult);
			function fetchWeather3() {
				var city = document.getElementById("city").value;
				console.log(latData + "&lon=" + lonData + " " + city);
				fetch(
					"https://api.openweathermap.org/data/2.5/onecall?lat=" +
						latData +
						"&lon=" +
						lonData +
						"&appid=" +
						APIKey
				)
					.then((dataRes) => dataRes.json())
					.then((uvData) => {
						console.log(uvData.current.uvi);
						window.uvi = uvData.current.uvi.toString();
					});
			}
			fetchWeather3();
			//if statement for undefined error handling
			if (window.uvi === undefined) {
					currentWeatherResult.append("UV: " + "UV Not Found");
			}
			if (window.uvi === undefined) {
			document.getElementById("uvInfo").classList.add('grey');
			}
			if (window.uvi === "0") {
				document.getElementById("uvInfo").classList.add('green');	
			}
			if (window.uvi === ["3","4","5"]) {
				document.getElementById("uvInfo").classList.add('yellow');	
			}
			if (window.uvi === ["6","7"]) {
				document.getElementById("uvInfo").classList.add('orange');	
			}
			if (window.uvi === ["8","9","10"]) {
				document.getElementById("uvInfo").classList.add('red');	
			}
			if (window.uvi === ["11","12","13"]) {
				document.getElementById("uvInfo").classList.add('black');	
			}
		});
}

//A function to get 5 day forecast
function fetchWeather2() {
	var city = document.getElementById("city").value;
	var queryForecastURL =
		"https://api.openweathermap.org/data/2.5/forecast?q=" +
		city +"&units=imperial"+
		"&appid=" +
		APIKey2;
	fetch(queryForecastURL)
		.then(function (response2) {
			console.log("the oneCall is working and mary is still great");
			return response2.json();
		})
		.then(function (data2) {
			console.log(data2);
			console.log(window.latData);
			console.log(window.lonData);

			//create <p> sections for the results and append results to the sections
			//TODO: get the correct days instead of the times from the data
			var day0 = document.createElement("p");
			iconImage2 = document.createElement("img");
			iconImage3 = document.createElement("img");
			iconImage4 = document.createElement("img");
			iconImage5 = document.createElement("img");
			iconImage6 = document.createElement("img");
			iconImage2.setAttribute(
				"src",
				"http://openweathermap.org/img/wn/" + data2.list[11].weather[0].icon + "@2x.png"
			);
			iconImage3.setAttribute(
				"src",
				"http://openweathermap.org/img/wn/" + data2.list[19].weather[0].icon + "@2x.png"
			);
			iconImage4.setAttribute(
				"src",
				"http://openweathermap.org/img/wn/" + data2.list[27].weather[0].icon + "@2x.png"
			);
			iconImage5.setAttribute(
				"src",
				"http://openweathermap.org/img/wn/" + data2.list[35].weather[0].icon + "@2x.png"
			);
			iconImage6.setAttribute(
				"src",
				"http://openweathermap.org/img/wn/" + data2.list[29].weather[0].icon + "@2x.png"
			);
			console.log (data2.list[11].weather[0].icon);
			weatherIcon.append(iconImage);
			day0.setAttribute("class", "day0result");
			day0.innerHTML =
				"Tomorrow " +
				data2.list[11].dt_txt +
				"<br>" +
				"Temp: " +
				data2.list[11].main.temp +
				" F<br>" +
				"Conditions: " +
				data2.list[11].weather[0].description +
				"<br>" +
				"Humidity: " +
				data2.list[11].main.humidity +
				"%<br>";
			tomorrowResult.append(iconImage2);
			tomorrowResult.append(day0);

			var day1 = document.createElement("p");
			day1.setAttribute("class", "day0result");
			day1.innerHTML =
				"Day 3" +
				data2.list[19].dt_txt +
				"<br>" +
				"Temp: " +
				data2.list[19].main.temp +
				" F<br>" +
				"Conditions: " +
				data2.list[19].weather[0].description +
				"<br>" +
				"Humidity: " +
				data2.list[19].main.humidity +
				"%<br>";
			day3result.append(iconImage3);
			day3result.append(day1);
			

			var day2 = document.createElement("p");
			day2.setAttribute("class", "day0result");
			day2.innerHTML =
				"Day 4" +
				data2.list[27].dt_txt +
				"<br>" +
				"Temp: " +
				data2.list[27].main.temp +
				" F<br>" +
				"Conditions: " +
				data2.list[27].weather[0].description +
				"<br>" +
				"Humidity: " +
				data2.list[27].main.humidity +
				"%<br>";
			day4result.append(iconImage4);
			day4result.append(day2);

			var day3 = document.createElement("p");
			day3.setAttribute("class", "day0result");
			day3.innerHTML =
				"Day 5" +
				data2.list[35].dt_txt +
				"<br>" +
				"Temp: " +
				data2.list[35].main.temp +
				" F<br>" +
				"Conditions: " +
				data2.list[35].weather[0].description +
				"<br>" +
				"Humidity: " +
				data2.list[35].main.humidity +
				"%<br>";
			day5result.append(iconImage5);
			day5result.append(day3);

			var day4 = document.createElement("p");
			day4.setAttribute("class", "day0result");
			day4.innerHTML =
				"Day 6" +
				data2.list[39].dt_txt +
				"<br>" +
				data2.list[39].main.temp +
				" F<br>" +
				"Conditions: " +
				data2.list[39].weather[0].description +
				"<br>" +
				"Humidity: " +
				data2.list[39].main.humidity +
				"%<br>";
			day6result.append(iconImage6);
			day6result.append(day4);
		});
}

//Added a search Button to run the function on click
document.getElementById("search").addEventListener("click", function (event) {
	event.preventDefault();
	console.log("you submitted on the form");
	fetchWeather1();
	fetchWeather2();
});
