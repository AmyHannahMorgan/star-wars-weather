const backgroundImage = document.querySelector('#backgroundImage');
const statement = document.querySelector('.statement');
const apiAddress = `${window.location.origin}/api`;
const clientLocation = navigator.geolocation;

clientLocation.getCurrentPosition((position) => {
    fetch(`${apiAddress}/getPlanet/?lat${position.coords.longitude}&lat=${position.coords.latitude}`)
    .then(response => {
        response.json().then(final => showResults(final));
    })
    .catch((err) => {
        console.log(err);
    });
}, (err) => {
    console.log(err)
});

function showResults(result) {
    statement.querySelector('h1').innerText = result.name;

    let resultBG = new Image();
    resultBG.src = `/assets/images/planet backgrounds/${result.name}.png`;

    resultBG.addEventListener('load', () => {
        backgroundImage.src = resultBG.src;
        statement.parentNode.classList.add('active');
    })
}