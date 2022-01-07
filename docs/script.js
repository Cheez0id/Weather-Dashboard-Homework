var APIKey = "66e0e6cbc1682477b1950be5f8d0cbc0";
var city = document.getElementById("city");
var cityResult = document.getElementById("result");

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={APIkey}
console.log(city.value);

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
//a function that when called will run a query on weather API
function fetchWeather1() {
  fetch(queryURL)
  .then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log("hello, below you'll find the url");
  console.log(data);
  // for (var i = 0; i <= data.length; i++) 
  // {
  //   console.log(data[i]);
  // var cityResult = document.createElement("p");
	// 			cityResult.textContent = (data[i]);
  //       result.append(cityResult);
  //     }
});
}
//Added a search Button to run the function on click
document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();
	console.log("you submitted on the form");
	fetchWeather1();
});


//write an event listener and a query selector (the event listener will have a function inside of it) set a variable listening to that whole form
// addEventListener("submit",function(){}