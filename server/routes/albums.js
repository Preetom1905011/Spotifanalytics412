const express = require('express');
const router = express.Router();
const { getAlbumsByArtists } = require('../controllers/albumController');

router.get('/albums', getAlbumsByArtists);

module.exports = router;