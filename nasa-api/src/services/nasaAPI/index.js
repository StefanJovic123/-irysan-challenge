const get = require('lodash.get');
const httpService = require('../httpService');
const { transformFeed } = require('./transformers');

const API_URL = process.env.NASA_API_URL;
const API_KEY = process.env.NASA_API_KEY;

const baseUrl = `${API_URL}`

const errorHandler = (e) => {
  const { response } = e;

  if (response?.data?.error_message) {
    return {
      error: true,
      status: 400,
      message: response?.data?.error_message
    }
  }

  if (response.status === 404) {
    return {
      error: true,
      status: 404,
      message: 'Entity not found'
    }
  }

  throw e;
}

/**
* Fetches feed data from Nasa API
*
* @param {Object} params - object holds query params.
* @param {string} obj.start_date - start date in following format yyyy/mm/dd.
* @param {string} obj.end_date - end date in following format yyyy/mm/dd
* @param {string} obj.sort_by - name of the field to sort by
* @param {string} obj.sort_order - supported values ['asc', 'desc]
*/
const getFeed = async (params = {}) => {
  const sortBy = get(params, 'sort_by', 'name');
  const sortOrder = get(params, 'sort_order', 'asc');

  const feed = await httpService
    .get(`${API_URL}/feed`, { ...params, api_key: API_KEY })
    .then(response => transformFeed(response, sortBy, sortOrder))
    .catch(errorHandler);

  return feed;
};

/**
* Fetches more details about single feed item

* @param {string} id - Id of feed item
*/
const getFeedItem = async (id) => {
  // TODO: do a error handling
  const feedItem = await httpService
    .get(`${baseUrl}/neo/${id}`, { api_key: API_KEY })
    .catch(errorHandler);
  return feedItem;
};


module.exports = { getFeed, getFeedItem };
