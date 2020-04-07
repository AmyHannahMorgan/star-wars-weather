const express = require('express');
const planetData = require('./planet data.json')
const app = express();
const port = process.env.PORT || 66;

app.use(express.static(`${__dirname}/static`));

app.get('/api/getPlanet/', (req, res) => {
    let temp = parseInt(req.query.temp);
    let lIndex = parseInt(req.query.lIndex);
    let humid = parseInt(req.query.humid);
    let clouds = parseInt(req.query.clouds);
    let rain = parseInt(req.query.rain);
    let type = req.query.type;

    findSimilarPlanet(temp, clouds, lIndex, humid, rain, type, planetData.planets);
})

app.listen(port);

console.log(`listening on port: ${port}`);

function findSimilarPlanet(temp, cloud, lIndex, humid, rain, type, planets) {
    let planetLikelyhood = [...planets];
    planets.forEach(planet => {
        if(planet.weatherTypes.includes(type)) {
            planet.likelyhood = 1;
        }
        else {
            planet.likelyhood = 0;
        }
    });

    planetLikelyhood = planetLikelyhood.filter((planet, i, array) => {
        if(planet.likelyhood > 0) {
            return true;
        }
        else return false;
    });

    let temps = compileValues("tempLow", "tempHigh", planetLikelyhood);
    let clouds = compileValues("cloudLow", "cloudHigh", planetLikelyhood);
    let lIndexes = compileValues("lIndexLow", "lIndexHigh", planetLikelyhood);
    let humidity = compileValues("humidLow", "humidHigh", planetLikelyhood);
    let raining = compileValues("rainLow", "rainHigh", planetLikelyhood);
}

function findPlanet(planetName, planets) {
    let found = null
    planets.forEach(planet => {
        if(planet.name === planetName) {
            console.log(planet);
            found = planet;
        }
    });

    return found;
}

function compileValues(lowValueName, highValueName, planets) {
    let values = []

    planets.forEach(planet => {
        let pair = [];
        pair.push(planet[lowValueName]);
        pair.push(planet[highValueName]);

        values.push(pair);
    });

    return values
}
