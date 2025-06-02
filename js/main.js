window.addEventListener('scroll', function () {
    const header = document.querySelector('.sticky-header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const cityList = ["Paris", "New York", "Tokyo", "London", "Sydney", "Berlin"];
const madagascarCityList = ["Antananarivo", "Toamasina", "Fianarantsoa", "Mahajanga", "Toliara", "Antsiranana", "Antsirabe", "Manakara", "Morondava", "Ambatondrazaka" ];
const allCityList = cityList.concat(madagascarCityList)
const cityModal = document.getElementById('cityModal');
const cityInput = document.getElementById('cityInput');
const confirmCity = document.getElementById('confirmCity');
const cancelCity = document.getElementById('cancelCity');
const suggestedCities = document.getElementById('suggestedCities');


function getTemperature(city, element = null) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const cityName = data.name;
            const weatherDescription = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            if (!element) {
                document.getElementById('city').textContent = cityName;
                document.getElementById('temperature_label').textContent = temperature;
                document.getElementById('weather_description').textContent = weatherDescription;
                document.getElementById('humidity').textContent = humidity;
                document.getElementById('wind').textContent = windSpeed;
            } else {
                element.innerHTML = `
                    <h5>${cityName}</h5>
                    <p>${temperature} °C</p>
                    <p>${weatherDescription}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
        });
}

function loadCities(array, idContainerCity) {
    const container = document.getElementById(`${idContainerCity}`);
    array.forEach(city => {
        const col = document.createElement('div');
        col.className = "col-md-4";
        const card = document.createElement('div');
        card.className = "city-card text-center";
        getTemperature(city, card);
        col.appendChild(card);
        container.appendChild(col);
    });
}


window.onload = () => {
    getTemperature("Antananarivo");
    loadCities(cityList, "popular-cities");
    loadCities(madagascarCityList, "mada-cities");
};

document.getElementById('change').addEventListener('click', () => {
    cityModal.style.display = 'flex';
    cityInput.value = '';
    cityInput.focus();
});

confirmCity.addEventListener('click', () => {
    const newCity = cityInput.value.trim();
    if (newCity) {
        getTemperature(newCity);
        cityModal.style.display = 'none';
    }
});

cancelCity.addEventListener('click', () => {
    cityModal.style.display = 'none';
});

allCityList.forEach(city => {
    const span = document.createElement('span');
    span.textContent = city;
    span.addEventListener('click', () => {
        cityInput.value = city;
        cityInput.focus(); 
    });
    suggestedCities.appendChild(span);
});
