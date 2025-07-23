const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const inputField = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const icon = document.querySelector('.icon');

const APIKey = '185dbcc57e27f9315a49d3f1c762ebd7';

function getWeather(city) {
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404' || json.cod === 404) {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        icon.style.display = 'none';

        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      // Hide error if previously shown
      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
      description.innerHTML = json.weather[0].description;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;

      const iconId = json.weather[0].icon;
      icon.innerHTML = `<img src="icons/${iconId}.png" alt="Weather icon" />`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      icon.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      icon.classList.add('fadeIn');

      container.style.height = '590px';
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Search on button click
searchButton.addEventListener('click', () => {
  const city = inputField.value.trim();
  getWeather(city);
});

// Search on Enter key press
inputField.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const city = inputField.value.trim();
    getWeather(city);
  }
});
