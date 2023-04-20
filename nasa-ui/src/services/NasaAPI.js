import { injectQueryParams } from 'utils/commons'
import baseService from './BaseService'

const API_URL = 'http://localhost:5000/api/v1'

export const fetchFeed = (params = {}) => {
  const { start_date, end_date, sort_by, sort_order } = params;
  return baseService
    .get(injectQueryParams(`${API_URL}/asteroids`, { start_date, end_date, sort_by, sort_order }))
    .then(response => response.data);
};

export const fetchFeedItem = (id) => {
  return baseService
    .get(injectQueryParams(`${API_URL}/asteroids/${id}`))
    .then(response => response.data);
};

