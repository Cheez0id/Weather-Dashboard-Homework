var APIKey = "66e0e6cbc1682477b1950be5f8d0cbc0";
var city="atlanta";

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={APIkey}

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL);

console.log (queryURL);

//write an event listener and a query selector (the event listener will have a function inside of it) set a variable listening to that whole form
addEventListener("submit",function(){

})