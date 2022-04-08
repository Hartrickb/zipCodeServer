// Algorithm to pick a top restauraunt
const { scorePlaces } = require('./Utils/scorePlaces');

// Returns the top ranked place
function pickForMe(places) {
  const scoredPlaces = scorePlaces(places);
  return scoredPlaces[0];
}

module.exports.pickForMe = pickForMe;
