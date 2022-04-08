const axios = require('axios').default;

// Converts zip to latLong
async function geoLocate(zipCode) {
  let options = {
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.MAPS_KEY}`,
    headers: {},
    maxRedirects: 20,
  };

  const response = await axios(options);
  const latLong = response.data.results[0].geometry.location;
  return latLong;
}

module.exports.geoLocate = geoLocate;
