// Algorithm to show top restauraunts
const _ = require('lodash');
const { scorePlaces } = require('./Utils/scorePlaces');


function letMeChoose(places) {
  const scoredPlaces = scorePlaces(places);
  return scoredPlaces.slice(0, 4);
}

module.exports.letMeChoose = letMeChoose;
