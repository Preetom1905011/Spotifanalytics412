const express = require("express");
const router = express.Router();
const {
  getAllArtists,
  getArtistsByGenres,
  getGenres
} = require("../controllers/artistController");

// Middleware to determine which controller to call
router.get("/artists", (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    // If query parameters exist, call getArtistsByGenres
    return getArtistsByGenres(req, res, next);
  } else {
    // If no query parameters, call getAllArtists
    return getAllArtists(req, res, next);
  }
});

router.get('/genres', getGenres);

module.exports = router;
