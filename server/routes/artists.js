const express = require('express');
const router = express.Router();
const { getArtists } = require('../controllers/artistController');

router.get('/artists', getArtistsByGenres);

module.exports = router;