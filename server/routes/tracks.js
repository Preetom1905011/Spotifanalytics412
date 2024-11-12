const express = require('express');
const router = express.Router();
const { getTracksByArtist } = require('../controllers/trackController');

router.get('/tracks', getTracksByArtist);

module.exports = router;