const backgroundImage = document.querySelector('#backgroundImage');
const statement = document.querySelector('.statement');
const apiAddress = `${window.location.origin}/api`;
const clientLocation = navigator.geolocation;

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

function showResults(result) {
    statement.querySelector('h1').innerText = result.planet.name;

    let resultBG = new Image();
    resultBG.src = `/assets/images/planet backgrounds/${result.planet.name}.png`;

    resultBG.addEventListener('load', () => {
        backgroundImage.src = resultBG.src;
        statement.parentNode.classList.add('active');
    })
}