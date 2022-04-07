const https = require('follow-redirects').https;
const fs = require('fs');
const cors = require('cors');

const express = require('express');
const app = express();
const port = 3001;

const { geoLocate } = require('./Utils/geoLocate');
const { getPlaces } = require('./Utils/places');
const { pickForMe } = require('./pickForMe');
const { letMeChoose } = require('./letMeChoose');

app.use(express.json());
app.use(cors());

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (request, response) => {
  response.send('hey');
});

app.post('/pickForMe', async (request, response) => {
  const location = request.body.location;
  let latLong;
  if (/^\d{5}(-\d{4})?$/.test(location)) {
    latLong = await geoLocate(location);
  } else {
    latLong = {
      lat: location.split(', ')[0],
      lng: location.split(', ')[1],
    };
  }
  const places = await getPlaces(latLong);

  let scoredPlaces = pickForMe(places);
  response.send(scoredPlaces[0]);

  response.on('error', (error) => {
    console.error(error);
  });
});

app.post('/letMeChoose', async (request, response) => {
  const location = request.body.location;
  let latLong;
  if (/^\d{5}(-\d{4})?$/.test(location)) {
    latLong = await geoLocate(location);
  } else {
    console.log(location.split(', ')[0]);
    latLong = {
      lat: location.split(', ')[0],
      lng: location.split(', ')[1],
    };
  }
  const places = await getPlaces(latLong);

  const topPlaces = letMeChoose(places);
  response.send(topPlaces);

  response.on('error', (error) => {
    console.error(error);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = {
  app,
};
