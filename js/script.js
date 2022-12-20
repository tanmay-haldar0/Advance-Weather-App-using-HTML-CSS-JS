const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
let result = document.getElementById('input-text');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

  const APIKey = '185dbcc57e27f9315a49d3f1c762ebd7'
  const city = document.querySelector('.search-box input').value;

  if (city === '')
    return;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

      if (json.cod === '404') {

        container.style.height = '400px';

        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';

        error404.style.display = 'block';
        error404.classList.add('fadeIn');

        return;

      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');
      const icon = document.querySelector('.icon');


      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      const icon_id = json.weather[0].icon;
      icon.innerHTML = `<img src="icons/${icon_id}.png">`

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      icon.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      icon.classList.add('fadeIn');


      container.style.height = '590px'

    })

});


var input = document.getElementById("input-text");
input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("result").click();
  }
});