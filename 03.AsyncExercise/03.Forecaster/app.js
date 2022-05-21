
function attachEvents() {
    document.getElementById('submit').addEventListener('click', displayForecast);  
}
attachEvents();


async function displayForecast() {
    const input = document.getElementById('location');
    const forecastEl = document.getElementById('forecast');
    const currentWeatherEl = forecastEl.children[0];
    const upcomingWeatherEl = forecastEl.children[1];

    const loCode = await getLocation();
    const [currentWeather, upcomingWeather] = await Promise.all([getCurrentWeather(loCode), getUpcomingWeather(loCode)]);
    
    const symbols = {
        'Sunny': '\u2600',
        'Partly sunny': '\u26C5',
        'Overcast': '\u2601',
        'Rain': '\u2614',
        'Degrees': '\xB0'
    }

    curWeatherDisplay(currentWeather);
    upcomingWeatherDisplay(upcomingWeather);

    function curWeatherDisplay(el) {
        const div = document.createElement('div');
        div.classList.add('forecasts'); 

        const symbolSpan = document.createElement('div');
        symbolSpan.textContent = symbols[el.forecast.condition];
        symbolSpan.classList.add('condition');
        symbolSpan.classList.add('symbol');

        const conditionSpan = document.createElement('span');
        conditionSpan.classList.add('condition');

        const span1 = document.createElement('span');
        span1.classList.add('forecast-data');
        span1.textContent = el.name;

        const span2 = document.createElement('span');
        span2.classList.add('forecast-data');
        span2.textContent = `${el.forecast.low}${symbols['Degrees']}/${el.forecast.high}${symbols['Degrees']}`

        const span3 = document.createElement('span');
        span3.classList.add('forecast-data');
        span3.textContent = el.forecast.condition;

        conditionSpan.appendChild(span1);
        conditionSpan.appendChild(span2);
        conditionSpan.appendChild(span3);
        div.appendChild(symbolSpan);
        div.appendChild(conditionSpan);
        currentWeatherEl.appendChild(div);
    }

    function upcomingWeatherDisplay(el) {
        const div = document.createElement('div');
        div.classList.add('forecast-info');
        el.forecast.forEach(day => {
            const daySpan = document.createElement('span');
            daySpan.classList.add('upcoming');

            const span1 = document.createElement('span');
            span1.classList.add('symbol');
            span1.textContent = symbols[day.condition];

            const span2 = document.createElement('span');
            span2.classList.add('forecast-data')
            span2.textContent = `${day.low}${symbols['Degrees']}/${day.high}${symbols['Degrees']}`;

            const span3 = document.createElement('span');
            span3.classList.add('forecast-data');
            span3.textContent = day.condition;

            daySpan.appendChild(span1);
            daySpan.appendChild(span2);
            daySpan.appendChild(span3);
            div.appendChild(daySpan);
        })
        upcomingWeatherEl.appendChild(div);
    }
    forecastEl.style.display = '';



    async function getLocation() {
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        try {
            const resp = await fetch(url);
            const data = await resp.json();
            
            const index = data.findIndex(c => c.name == input.value);
    
            if (resp.status != 200 || index == -1) {
                throw new Error('Location not found');
            }
    
            return data[index].code;
        } catch{
            forecastEl.style.display = '';
            forecastEl.textContent = 'Location not found';
        }
    }
    
    async function getCurrentWeather(code) {
        const url = `http://localhost:3030/jsonstore/forecaster/today/` + code;
    
        const resp = await fetch(url);
        const data = await resp.json();
        return data; 
    }
     
    async function getUpcomingWeather(code) {
        const url = `http://localhost:3030/jsonstore/forecaster/upcoming/` + code;
    
        const resp = await fetch(url);
        const data = await resp.json();
        return data;
    }
}



 
