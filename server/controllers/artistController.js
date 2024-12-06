const sequelize = require("../config/database");

const getAllArtists = async (req, res) => {
  try {
    // Fetch artists
    const artists = await sequelize.query(
      `
      SELECT DISTINCT
        P_NAME
      FROM 
        PERSON
      WHERE 
        P_TYPE = 'artist'
      ORDER BY P_NAME ASC;
      `
    );
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArtistsByGenres = async (req, res) => {
  const { genres = [], limit = 10, order = "desc" } = req.query;

  try {
    // Validate and sanitize input
    const validOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";
    const genreList = Array.isArray(genres) ? genres : [genres];

    if (genreList.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide at least one genre." });
    }

    // Fetch artists who have all input genres
    const artists = await sequelize.query(
      `
      SELECT DISTINCT
        P_NAME, AR_POPULARITY, AR_GENRE
      FROM 
        PERSON
      JOIN 
        ARTIST ON PERSON.P_ID = ARTIST.AR_ID
      WHERE 
        ARTIST.AR_GENRE @> :genreList
      ORDER BY AR_POPULARITY ${validOrder}
      LIMIT :limit;
      `,
      {
        replacements: {
          genreList: `{${genreList.join(",")}}`,
          limit: parseInt(limit, 10),
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGenres = async (req, res) => {
  try {
    // Fetch genre
    const genres = await sequelize.query(
      `
    SELECT DISTINCT unnest(AR_GENRE) AS genre
FROM ARTIST
ORDER BY genre ASC;
    `
    );
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllArtists, getArtistsByGenres, getGenres };
