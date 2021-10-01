var searchBtn = document.getElementById('search');
var currentWeatherContainer = document.getElementById('currentWeather');

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
  // console.log(currentWeather);
}

function renderForecast(forecast){
  // console.log(forecast)
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
  console.log("searched: "+ searchedCities)
  // console.log(enteredTxt);
  localStorage.setItem("Cities Searched", searchedCities);
  // append those searched to the HTML page
  
});













// // a loop thourgh to get the stored data to be on the textare on refresh
// textArea.each(function(){

//   var storedData = $(this).parent().attr('id');
//   // console.log(storedData);
//   // console.log(localStorage.getItem(storedData));
//   var showTxt = localStorage.getItem(storedData);
//   $(this).val(showTxt);
// });
