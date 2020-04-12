const getWeatherButt = document.querySelector('#getWeatherButton');
const backgroundImage = document.querySelector('#backgroundImage');
const statement = document.querySelector('.statement');
const weatherDisplay = document.querySelector('.locationWeather');
const apiAddress = `${window.location.origin}/api`;
const clientLocation = navigator.geolocation;


getWeatherButt.addEventListener('click', () => {
    getWeatherButt.style.display = 'none';
    clientLocation.getCurrentPosition((position) => {
        fetch(`${apiAddress}/getPlanet/?lon=${position.coords.longitude}&lat=${position.coords.latitude}`)
        .then(response => {
            response.json().then(final => showResults(final));
        })
        .catch((err) => {
            console.log(err);
        });
    },
    error => {
        if(error.code == 1) {
            fetch(`${apiAddress}/getPlanet/?lon=51.48&lat=3.17`)
            .then(response => {
                response.json().then(final => {
                    statement.querySelector('h3').innerText = 'Cardiff, it\'s like...';
                    showResults(final)
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
        console.log(error);
    });
});

function showResults(result) {
    statement.querySelector('h1').innerText = result.planet.name;

    let values = getRainAndCloudFunction(result.weather.rainAmount, result.weather.cloudCover);

    weatherDisplay.querySelector('#temp').querySelector('h3').innerHTML = `${result.weather.temp}&deg;C`;
    weatherDisplay.querySelector('#humid').querySelector('h3').innerHTML = `${result.weather.humidity}%`;
    weatherDisplay.querySelector('#cloud').querySelector('h3').innerHTML = `${values.clouds}`;
    weatherDisplay.querySelector('#rain').querySelector('h3').innerHTML = `${values.rain}`;
    
    let resultBG = new Image();
    resultBG.src = `/assets/images/planet backgrounds/${result.planet.name}.png`;

    resultBG.addEventListener('load', () => {
        backgroundImage.src = resultBG.src;
        statement.parentNode.classList.add('active');
    })
}

function getRainAndCloudFunction(rainValue, cloudValue) {
    let cloudTerm
    let rainTerm

    if(cloudValue < 3) cloudTerm = 'Clear';
    else if(cloudValue > 2 && cloudValue < 6) cloudTerm = 'Partially Cloudy';
    else if(cloudValue > 5 && cloudValue < 8) cloudTerm = 'Cloudy';
    else cloudTerm = 'Very Cloudy';

    if(rainValue === 0) rainTerm = 'None';
    else if(rainValue < 4) {
        if(cloudValue > 8) rainTerm = 'Light Rain'
        else if(cloudValue > 6) rainTerm = 'Occasional Showers';
        else rainTerm = 'Isolated Showers';
    }
    else rainTerm = 'Rain'

    return {
        clouds: cloudTerm,
        rain: rainTerm
    };
}