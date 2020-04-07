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
