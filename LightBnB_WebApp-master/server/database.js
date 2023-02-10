// const properties = require('./json/properties.json');
// const users = require('./json/users.json');
const properties = require('pg');
const users = require('pg');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

pool.connect()

pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {})
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
  .query(`
    SELECT *
    FROM users
    WHERE email = $1
  `, [email])
  .then((result) => {
    if (result.rows.length > 0){
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(`
    SELECT *
    FROM users
    WHERE id = $1
  `, [id])
  .then((result) => {
    if (result.rows.length > 0){
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(`
    INSERT INTO users (name, password, email)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [user.name, user.password, user.email])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
  .query(`
  SELECT properties.*, reservations.id as id, reservations.start_date as start_date, properties.cost_per_night as cost_per_night, avg(rating) as average_rating
  FROM properties
  JOIN reservations ON reservations.property_id = properties.id
  LEFT JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date
  `, [guest_id])
    .then((result) => {
    return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
  ;
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {

  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(rating)
  FROM properties
  JOIN property_reviews ON property_id = properties.id `;

  //Searching by city
  if (options.city) {
    queryParams.push(`${options.city}`);
    queryString += `
    WHERE city LIKE $${queryParams.length} `;
  }

  //Searching by owner
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    if (queryParams.length === 1) {
      queryString += `
      WHERE property.owner_id = $${queryParams.length}`;
    } else {
      queryString += `
      AND property.owner_id = $${queryParams.length}`;
    }
  }

  //Searching by min price
  if (options.minimum_price_per_night) {
    let minPrice = options.minimum_price_per_night * 100;
    queryParams.push(`${minPrice}`);
    if (queryParams.length === 1) {
      queryString += `
      WHERE cost_per_night >= $${queryParams.length}`;
    } else {
      queryString += `
      AND cost_per_night >= $${queryParams.length}`;
    }
  }

  //Searching by max price
  if (options.maximum_price_per_night) {
    let maxPrice = options.maximum_price_per_night * 100;
    queryParams.push(`${maxPrice}`);
    if (queryParams.length === 1) {
      queryString += `
      WHERE cost_per_night <= $${queryParams.length}`;
    } else {
      queryString += `
      AND cost_per_night <= $${queryParams.length}`;
    }
  }

  
  queryString += `
  GROUP BY properties.id`;
  
  //Searching by rating
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
    HAVING avg(rating) >= $${queryParams.length}`;
  } 
  

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log("queryString:", queryString, "queryParams:", queryParams, "queryParams length:", queryParams.length);

  return pool
  .query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => {
    console.log(err.message);
  });

};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
