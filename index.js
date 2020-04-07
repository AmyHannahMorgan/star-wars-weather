const express = require('express');
const app = express();
const port = process.env.PORT || 66;

app.use(express.static(`${__dirname}/static`));

app.get('/api/getPlanet/', (req, res) => {
    let temp = req.query.temp;
    let lIndex = req.query.lIndex;
    let humid = req.query.humid;
    let clouds = req.query.clouds;
    let rain = req.query.clouds;
    let type = req.query.type;
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
    });

    planets.forEach(planet => {
        if(planet.weatherTypes.includes(type)) {
            findPlanet(planet.name, planetLikelyhood).likelyhood += 1;
            console.log(findPlanet(planet.name, planetLikelyhood).likelyhood);
        }
    });
}

function findPlanet(planetName, planets) {
    planets.forEach(planet => {
        if(planet.name === planetName) {
            return planet
        }
    });

    return null;
}
