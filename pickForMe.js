// Algorithm to pick a top restauraunt
const _ = require('lodash');
const { scorePlaces } = require('./Utils/scorePlaces');


function pickForMe(places) {
  const scoredPlaces = scorePlaces(places);
  return scoredPlaces;
}

module.exports.pickForMe = pickForMe;
