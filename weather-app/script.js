const apiKey = '3881052dd753dbb22c8ee481634061ad';  // Your OpenWeatherMap API key
const searchBtn = document.getElementById('searchBtn');
const geoBtn = document.getElementById('geoBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

// Fetch weather by city name
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Fetch weather by geolocation
geoBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

// Fetch weather using city name
function getWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(() => alert('Failed to fetch weather data.'));
}

// Fetch weather using coordinates
function getWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(() => alert('Failed to fetch weather data.'));
}

// Display weather info
function displayWeather(data) {
    if (data.cod === 200) {
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p><strong>🌡 Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>🤔 Feels Like:</strong> ${data.main.feels_like} °C</p>
            <p><strong>🌤 Condition:</strong> ${data.weather[0].description}</p>
            <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>🌬 Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherInfo.innerHTML = `<p>❌ City not found. Try again.</p>`;
    }
}
