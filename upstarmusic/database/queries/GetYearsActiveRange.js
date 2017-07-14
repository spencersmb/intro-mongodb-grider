const Artist = require('../models/artist')

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  const min = Artist
    .find({})
    .sort({yearsActive: 1})
    .limit(1) // easy way to only get the first result in an array back with no loop
    .then((artist) => artist[0].yearsActive)

  const max = Artist
    .find({})
    .sort({yearsActive: -1})
    .limit(1)
    .then((artist) => artist[0].yearsActive)

  // Sets the min and max of an input range slider
  return Promise.all([min, max]).then(r => ({
    min: r[0],
    max: r[1]
  }))
}
