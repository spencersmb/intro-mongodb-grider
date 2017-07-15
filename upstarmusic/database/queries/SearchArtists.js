const Artist = require('../models/artist')

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {number} offset How many records to skip in the result set
 * @param {number} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = Artist
    .find(buildQuery(criteria))
    .sort({[sortProperty]: 1})
    .skip(offset)
    .limit(limit)

  const countPromise = Artist.find(buildQuery(criteria)).count()
  // console.log('queryCount', queryCount)

  const request = Artist.aggregate(
    [
      {$match: buildQuery(criteria)},
      {$sort: {[sortProperty]: 1}},
      {
        $group: {
          _id: 'null',
          count:
            {$sum: 1},
          results: {$push: '$$ROOT'}
        }
      },
      {
        '$unwind': '$results'
      },
      {$skip: offset},
      {$limit: limit},
      {
        $project: {
          _id: 1,
          name: 1,
          count: 1,
          results: 1
        }
      }
    ]
  )

  return request.then(re => {
    // Need to map over results and pull them out into their own array
    console.log('re', re)

    const all = re.map(item => item.results)
    // console.log('re', all)

    return {
      all: all,
      count: re[0].count,
      offset: offset,
      limit: limit
    }
  })

  // return Promise.all([query, countPromise]).then(r => {
  //   console.log('r', r)
  //
  //   return {
  //     all: r[0],
  //     count: r[1],
  //     offset: offset,
  //     limit: limit
  //   }
  // })
}

const buildQuery = criteria => {
  const {age, name, yearsActive} = criteria
  const query = {}

  if (name) {
    // FULL TEXT SEARCH
    query.$text = {
      $search: name
    }
    // REGEX Search Option
    // query.name = {
    //   $regex: name,
    //   $options: 'i' // not case sensitive
    // }
  }

  // Build Query as we go
  if (age) {
    query.age = {
      $gt: age.min,
      $lt: age.max
    }
  }

  if (yearsActive) {
    query.yearsActive = {
      $gt: yearsActive.min,
      $lt: yearsActive.max
    }
  }

  return query
}
