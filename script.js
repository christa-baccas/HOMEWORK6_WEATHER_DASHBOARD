var city = 'austin';
var stateCode = '78702';

function getApi() {
  var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${stateCode}&appid=bbb2958c4a7e079d6061f61d0fb13c44`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}
getApi();
