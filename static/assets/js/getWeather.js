const backgroundImage = document.querySelector('#backgroundImage');
const statement = document.querySelector('.statement');
const apiAddress = `${window.location.origin}/api`;
const clientLocation = navigator.geolocation;

clientLocation.getCurrentPosition((position) => {
    fetch(`http://www.7timer.info/bin/api.pl?lon=${position.coords.longitude}&lat=${position.coords.latitude}&product=civil&output=json`)
    .then((res) => {
        res.json().then(result => {
            result = result.dataseries[0];
            console.log(result);
            fetch(`${apiAddress}/getPlanet/?temp=${result.temp2m}&lIndex=${result.lifted_index}&humid=${parseInt(result.rh2m.replace('%', ''))}&clouds=${result.cloudcover}&rain=${result.prec_ammount}&type=${result.weather}`)
            .then(response => {
                response.json().then(final => showResults(final));
            })
        });
    })
    .catch((err) => {
        console.log(err);
    });
}, (err) => {
    console.log(err)
});

function showResults(result) {
    statement.querySelector('h1').innerText = result.name;
}