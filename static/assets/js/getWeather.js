const backgroundImage = document.querySelector('#backgroundImage');
const statement = document.querySelector('.statement');
const apiAddress = `${window.location.origin}/api`;
const clientLocation = navigator.geolocation;

clientLocation.getCurrentPosition((position) => {
    fetch(`http://www.7timer.info/bin/api.pl?lon=${position.coords.longitude}&lat=${position.coords.latitude}&product=civil&output=json`)
    .then((res) => {
        res.json().then(result => {
            
        });
    })
    .catch((err) => {
        console.log(err);
    });
}, (err) => {
    console.log(err)
})