const { scorePlaces } = require('./Utils/scorePlaces');

// Returns top 4 places by score
function letMeChoose(places) {
  const scoredPlaces = scorePlaces(places);
  return scoredPlaces.slice(0, 4);
}

module.exports.letMeChoose = letMeChoose;
