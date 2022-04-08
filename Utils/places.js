const axios = require('axios').default;
const _ = require('lodash');

// Pages through and filters results
async function getPlaces(latLong) {
  let places = [];
  let response;
  do {
    const nextPageToken = _.get(response, 'data.next_page_token', '');
    // Google rate limit
    await new Promise((resolve) => setTimeout(resolve, 1500));
    let options = {
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${latLong.lat}%2C${latLong.lng}&radius=3000&query=lunch&maxprice=2&pagetoken=${nextPageToken}&key=${process.env.MAPS_KEY}`,
      headers: {},
    };

    response = await axios(options);
    places.push(...response.data.results);
  } while (_.has(response.data, 'next_page_token'));

  return filterPlaces(places);
}

// Remove low rated or closed restaurants
function filterPlaces(places) {
  places = _.filter(places, { business_status: 'OPERATIONAL' });
  places = _.filter(places, ({ rating }) => rating >= 3.5);
  places = _.filter(places, { opening_hours: { open_now: true } });

  return formatPlaces(places);
}

// Helper function to make places more user friendly
function formatPlaces(places) {
  let mappedPlaces = places.map((place) => {
    let mappedPlace = {};
    mappedPlace['location'] = {};
    mappedPlace.location['lat'] = place.geometry.location.lat;
    mappedPlace.location['long'] = place.geometry.location.lng;
    mappedPlace.location['address'] = _.trim(
      place.formatted_address,
      ', United States'
    );
    mappedPlace.location['distance'] = _.round(
      Math.abs(latLong.lat - place.geometry.location.lat) +
        Math.abs(latLong.lng - place.geometry.location.lng),
      4
    );
    mappedPlace['name'] = place.name;
    mappedPlace['ratings'] = {};
    mappedPlace.ratings['rating'] = place.rating;
    mappedPlace.ratings['numberOfRatings'] = place.user_ratings_total;
    mappedPlace['price'] = place.price_level;
    return mappedPlace;
  });
  return mappedPlaces;
}

module.exports.getPlaces = getPlaces;
