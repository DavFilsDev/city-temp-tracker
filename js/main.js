let selectedCity = "saint-saulve";
getTemperature(selectedCity);

let changeCityButton = document.querySelector('#change');
changeCityButton.addEventListener('click', () => {
  selectedCity = prompt('Which city would you like to check?');
  getTemperature(selectedCity);
});

function getTemperature(city) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + OPENWEATHER_API_KEY + '&units=metric';

  let request = new XMLHttpRequest(); // Create an object to send requests
  request.open('GET', url); // We are just retrieving data
  request.responseType = 'json'; // We expect a JSON response
  request.send(); // Send the request

  // This function runs as soon as a response is received
  request.onload = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        let response = request.response;
        let temperature = response.main.temp;
        let cityName = response.name;
        document.querySelector('#temperature_label').textContent = temperature;
        document.querySelector('#city').textContent = cityName;
      } else {
        alert('Something went wrong. Please try again later.');
      }
    }
  }
}
