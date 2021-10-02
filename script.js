var searchBtn = document.getElementById('search');
var currentWeatherContainer = document.getElementById('currentWeather');
var historyContainer = document.getElementById('history');

function getApi() {
  // the input value being searched
  var city = document.getElementById('input').value;
  // console.log(city);
  // Api that gives lat and lon when a city is entered
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bbb2958c4a7e079d6061f61d0fb13c44`; 
  // fetch calls the API
  fetch(requestUrl)
    //recevie response from API
    .then(function (response) {
    //response is then converted to json
      return response.json();
    })
    //date is then being read
    .then(function (data) {
        //console.log(data.coord.lon);
        oneCallApi(data)
    })
}

// a function to get the lat and lon from the first API call
function oneCallApi(data){
  // varaiables that get the lat and lon 
  var lat = data.coord.lat;
  var lon= data.coord.lon;
  // fetch to the lat and lon API 
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=bbb2958c4a7e079d6061f61d0fb13c44`)
  //recevie response from API
  .then(function (response){
    //response is then converted to json
    return response.json()
    //date is then being read
  }).then(function (data){
    renderCurrentWeather(data.current)
    renderForecast(data.daily)
  })
}

function renderCurrentWeather(currentWeather){
  var temp = document.querySelector('.card-temp');
  var humidity = document.querySelector('.card-humidity');
  var wind = document.querySelector('.card-wind');
  var uvi = document.querySelector('.card-uvi');
  var mainWeather = document.getElementById('mainWeather');
  mainWeather.setAttribute('style', 'border: 2px solid black');

  temp.textContent = "Temp: " + currentWeather.temp + " \u00B0 F";
  humidity.textContent = "Humidity: " + currentWeather.humidity + " %";
  wind.textContent = "Wind: " + currentWeather.wind_speed + " MPH";
  uvi.textContent = "UV Index: " + currentWeather.uvi;
}

function renderForecast(forecast){
  // var temp = document.querySelector('.card-temp');
  // var humidity = document.querySelector('.card-humidity');
  // var wind = document.querySelector('.card-wind');
  // var uvi = document.querySelector('.card-uvi');
  // temp.textContent = "Temp: " + currentWeather.temp;
  // humidity.textContent = "Humidity: " + currentWeather.humidity;
  // wind.textContent = "Wind: " + currentWeather.wind_speed;
  // uvi.textContent = "UVI: " + currentWeather.uvi;
}

// when search button is clicked the getAPI function will run
searchBtn.onclick = getApi;

//store searches in an array to local storage
var searchedCities = [];


searchBtn.addEventListener('click', function(){
  // city that is entered in the search box
  var enteredTxt = document.getElementById('input').value;
  // push data into the empty array (seachedCities)
  searchedCities.push(enteredTxt);
  // console.log("searched: "+ searchedCities)
  // console.log(enteredTxt);
  localStorage.setItem("Cities Searched", searchedCities);
  searchHistory();
});

// console.log(historyContainer);

// this append those searched cities to the HTML page
function searchHistory(){
    var historyBtn = document.createElement('button');
    var enteredTxt = document.getElementById('input').value;
    console.log(historyBtn);
    historyBtn.setAttribute('class','btn btn-secondary btn-lg col');
    historyBtn.setAttribute('type','button');
    historyBtn.textContent = enteredTxt.charAt(0).toUpperCase() + enteredTxt.slice(1);;
    historyContainer.append(historyBtn);
}
