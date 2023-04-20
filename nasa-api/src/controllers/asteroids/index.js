const express = require('express');
const { nasaAPI } = require('../../services');
const { validateMiddleware } = require('../../middlewares');
const { getFeedQueryParamsSchema, getFeedItemParamsSchema } = require('./validators');

const router = express.Router();

router.get('/', validateMiddleware(getFeedQueryParamsSchema, 'query'), async (req, res, next) => {
  const { query } = req;
  try {
    const feed = await nasaAPI.getFeed(query);
    if (feed.error) {
      return res.status(feed.status).json(feed)
    }

    return res.json({
      status: 200,
      data: feed,
      message: 'success'
    });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', validateMiddleware(getFeedItemParamsSchema, 'params'), async (req, res, next) => {
  const { id } = req.params;
  try {
    const feed = await nasaAPI.getFeedItem(id);
    if (feed.error) {
      return res.status(feed.status).json(feed)
    }
    return res.json({
      status: 200,
      data: feed,
      message: 'success'
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
