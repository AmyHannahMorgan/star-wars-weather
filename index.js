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
    let planetLikelyhood = []
    planets.forEach(planet => {
        let obj = {
            name: planet.name,
            likelyhood: 0
        };

        planetLikelyhood.push(obj);

        if(planet.weatherTypes.includes(type)) {
            findPlanet(planet.name, planetLikelyhood).likelyhood += 1;
            console.log(findPlanet(planet.name, planetLikelyhood).likelyhood);
        }
    });
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
