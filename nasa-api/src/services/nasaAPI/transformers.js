const orderBy = require('lodash.orderby');
const get = require('lodash.get');

const transformFeed = (feed = {}, sortBy = 'name', order = 'asc') => {
  if (!feed) {
    return null;
  }

  const nearEarthObjects = get(feed, 'near_earth_objects', {});
  const flattenNearEarthObjects = []; 
  Object.keys(nearEarthObjects).map((date) => {
    nearEarthObjects[date].map((item) => {
      flattenNearEarthObjects.push({ ...item, date });
    });
  });

  return orderBy(flattenNearEarthObjects, [sortBy], [order]);
};

module.exports = { transformFeed };