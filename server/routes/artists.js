const express = require('express');
const router = express.Router();
const { getArtists } = require('../controllers/artistController');

router.get('/artists', getArtists);

module.exports = router;