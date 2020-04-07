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

    let temps = compairPairs(compileValues("tempLow", "tempHigh", planetLikelyhood), temp);
    let clouds = compairPairs(compileValues("cloudLow", "cloudHigh", planetLikelyhood), cloud);
    let lIndexes = compairPairs(compileValues("lIndexLow", "lIndexHigh", planetLikelyhood), lIndex);
    let humidity = compairPairs(compileValues("humidLow", "humidHigh", planetLikelyhood), humid);
    let raining = compairPairs(compileValues("rainLow", "rainHigh", planetLikelyhood), rain);

    if(temps[0] !== null) planetLikelyhood[temps[0]].likelyhood += 1;
    if(temps[1] !== null) planetLikelyhood[temps[1]].likelyhood += 1;
    if(clouds[0] !== null) planetLikelyhood[clouds[0]].likelyhood += 1;
    if(clouds[1] !== null) planetLikelyhood[clouds[1]].likelyhood += 1;
    if(lIndexes[0] !== null) planetLikelyhood[lIndexes[0]].likelyhood += 1;
    if(lIndexes[1] !== null) planetLikelyhood[lIndexes[1]].likelyhood += 1;
    if(humidity[0] !== null) planetLikelyhood[humidity[0]].likelyhood += 1;
    if(humidity[1] !== null) planetLikelyhood[humidity[1]].likelyhood += 1;
    if(raining[0] !== null) planetLikelyhood[raining[0]].likelyhood += 1;
    if(raining[1] !== null) planetLikelyhood[raining[1]].likelyhood += 1;

    console.log({planetLikelyhood});
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

function compairPairs(pairArray, value) {
    let smallestRange = null;
    let smallestRangeI = null;
    let closestMedian = null;
    let closestMedianI = null;

    pairArray.forEach((pair, index) => {
        let range = pair[1] - pair[0];
        let median = (pair[0] + pair[1]) / 2;

        if(value >= pair[0] && value <= pair[1]) {
            if(range < smallestRange || smallestRange === null) {
                smallestRange = range;
                smallestRangeI = index;
            }
    
            if(Math.abs(median - value) < closestMedian || closestMedian === null)  {
                closestMedian = Math.abs(median - value);
                closestMedianI = index;
            }
        }

    });

    return [smallestRangeI, closestMedianI];
}
