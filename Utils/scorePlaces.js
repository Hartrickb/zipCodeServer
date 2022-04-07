// Scores restaurants
const _ = require('lodash');

function scorePlaces(places) {
  const maxNumberOfRatings = _.maxBy(places, 'ratings.numberOfRatings').ratings.numberOfRatings;
  const maxPrice = 2;
  const maxDistance = _.maxBy(places, 'location.distance').location.distance + .001;

  const scoredPlaces = places.map(place => {
    let scoredPlace = place;
    scoredPlace['scores'] = {};
    scoredPlace.scores['price'] = (maxPrice / place.price) / 2;
    scoredPlace.scores['rating'] = _.round((place.ratings.rating / 5) * 4, 4);
    scoredPlace.scores['numberOfRatings'] = _.round((place.ratings.numberOfRatings / maxNumberOfRatings) * 3, 4);
    scoredPlace.scores['distance'] = _.round(((1 - (place.location.distance / maxDistance)) * 2), 4)
    scoredPlace.scores['total'] = _.round(scoredPlace.scores.price + scoredPlace.scores.rating + scoredPlace.scores.numberOfRatings + scoredPlace.scores.distance, 4);
    return scoredPlace;
  })

  return _.orderBy(scoredPlaces, 'scores.total', 'desc');
}

module.exports.scorePlaces = scorePlaces;
