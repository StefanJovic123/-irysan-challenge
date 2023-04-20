
const express = require('express');

const asteroids = require('./asteroids');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/asteroids', asteroids);

module.exports = router;