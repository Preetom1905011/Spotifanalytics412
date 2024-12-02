const express = require('express');
const router = express.Router();
const { getTracksByArtists } = require('../controllers/trackController');

router.get('/tracks', getTracksByArtists);

module.exports = router;