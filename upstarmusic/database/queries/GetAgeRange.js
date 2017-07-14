const Artist = require('../models/artist')

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  const min = Artist
    .find({})
    .sort({age: 1})
    .limit(1) // easy way to only get the first result back with no loop
    .then((artist) => artist[0].age)

  const max = Artist
    .find({})
    .sort({age: -1})
    .limit(1)
    .then((artist) => artist[0].age)

  // Sets the min and max of an input range slider
  return Promise.all([min, max]).then(r => ({
    min: r[0],
    max: r[1]
  }))
}

// Example usage
// getAgeRange()
//   .then(result => {
//     result = {
//       min: 15,
//       max: 50
//     }
//   })
