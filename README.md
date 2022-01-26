# Weather-Dashboard-Homework
Deployed App
https://cheez0id.github.io/Weather-Dashboard-Homework/

![Screenshot](https://raw.githubusercontent.com/Cheez0id/Weather-Dashboard-Homework/main/assets/wdb.JPG)

## Homework
Create a browser app weather dashboard using third-party APIs to complete below acceptance criteria.

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with currentand future conditions for that city and that city is added to the search history {//in progress//}
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index 
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe{}
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity{}
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city{}
```

## Pseudocode

1. Get layout for page design
 1a. Overall layout from Bootstrap? Jquery?
 1b. Review each element on the page and find Jquery UI widgets?
2. Link all necessary scripts/stylesheets
  2a. openweathermap.org (have account set up and API key in e-mail)
  2b. jquery? bootstrap?
3. Cities searched will have to be saved in local storage


## Some Notes
- see unit 6 activity 3 for a nice loop in the JS calling urls and having them placed on the page. 

## Pseudocode from Instructor

1) I want to make sure I retrieve data from the API call.
    => I can get the fetch call to work properly
        => Let's console.log stuff
        => link a script tag to an html
        => console.log the data from the fetch call
        => observe & research the array of objects returning.

2) I would start to stylize/add divs to my page
    => I would pick out a div to RENDER MY RESULTS
    => Form will be its own form
    => div = search results
    2a) div (box for the forecast the day of)
        -> Fetch the data for the weather DAY OF.
        -> Get the data for the city name, current date, temperature, wind speed humidity, and UV index. 
        -> Get it to SOMEHOW DISPLAY TO THE PAGE. 
        -> textContent to show it to the page
        -> Append that to the page (appendChild)

        -> To grab images => The data will give you a png/jpg, so find a way to get the image tag to accept a src link!

    2b) div (the boxes for the five day forecast)
        -> for loop through the 5 day forecast
        -> Generate a div/box that contains each of the data
        -> That way you don't have to make static html elements on the page to fill

3) Search box
    => A form where upon submission (submit), i take the VALUE of the form and pass that VALUE into the fetch call's URL.
    => make sure the form does not go back to DEFAULT. Some kind of PREVENTION

4) Getting the previous search histories to display on the bottom left of the page
    -> localStorage
    -> We need to grab the values that we type into the search form, and STORE it in localStorage as an array. (Maybe SET THE ITEM in the localStorage somehow)
    -> for loop to iterate through the localStorage's array AFTER GETTING THE ITEMS IN THE ARRAY and then make elements, textContent
    4b) We need to not just make it into a div, we need to make them into a BUTTON with some DATA ATTRIBUTE that holds the NAME of the city that can then be PASSED into a api call. 


##Reference for learning/using Tailwind
<https://www.youtube.com/watch?v=UBOj6rqRUME&ab_channel=TraversyMedia>

<https://www.youtube.com/watch?v=bxmDnn7lrnk&ab_channel=TheNetNinja>
