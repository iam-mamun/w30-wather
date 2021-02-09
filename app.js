const condition = document.getElementById('condition');
const city = document.getElementById('city');
const country = document.getElementById('country');
const mainText = document.getElementById('main');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');

const cityInput = document.getElementById('city-input');
const historyElm = document.getElementById('history');
const masterHistory = document.getElementById('master-history');

const API_KEY = '421068c607f7d591ccf781e448581f24';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}`;
const ICON_URL = `https://openweathermap.org/img/wn/`;
const CITY_NAME = 'Chittagong, BD';

window.onload = function() {
    navigator.geolocation.getCurrentPosition(s => {
        getWeatherData(null, s.coords)
    }, f => {
        getWeatherData()
    })

    cityInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
           if(e.target.value) {
               getWeatherData(e.target.value)
               e.target.value = ''
           } else {
               alert('Please provide a valid city name.')
           }
        }
    })
}

function getWeatherData(city = CITY_NAME, coords) {
    let url = BASE_URL;

    city === null ?
        url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` :
        url = `${url}&q=${city}`;

    axios.get(url)
        .then(({data}) => {
            let weather = {
                icon: data.weather[0].icon,
                name: data.name,
                country: data.sys.country,
                main: data.weather[0].main,
                description: data.weather[0].description,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            }

            setWeather(weather)

        })
        .catch(e => {
            console.log(e)
            alert('Your city not found.')
        })
}

function setWeather(obj) {
    condition.src = `${ICON_URL}${obj.icon}@2x.png`
    city.innerHTML = obj.name
    country.innerHTML = obj.country
    mainText.innerHTML = obj.main
    description.innerHTML = obj.description
    temp.innerHTML = obj.temp
    pressure.innerHTML = obj.pressure
    humidity.innerHTML = obj.humidity
}
