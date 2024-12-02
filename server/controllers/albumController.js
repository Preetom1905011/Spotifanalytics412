const sequelize = require('../config/database');

const getAlbumsByArtists = async (req, res) => {
  const { artistNames = [], start, end, order = 'desc' } = req.query;

  try {
    // Validate and sanitize input
    const validOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
    const artistList = Array.isArray(artistNames) ? artistNames : [artistNames];

    if (artistList.length === 0) {
      return res.status(400).json({ message: "Please provide at least one artist name." });
    }

    if (!start || !end) {
      return res.status(400).json({ message: "Please provide both start and end dates." });
    }

    const results = {};

    // Fetch albums for each artist
    for (const artistName of artistList) {
      const albums = await sequelize.query(
        `
        SELECT DISTINCT
          AL_ID, AL_NAME, AL_RELEASEDATE, AL_POPULARITY
        FROM 
          ALBUM
        JOIN 
          ARTIST ON ALBUM.AL_ARTIST_ID = ARTIST.AR_ID
        JOIN 
          PERSON ON PERSON.P_ID = ARTIST.AR_ID
        WHERE 
          PERSON.P_NAME = :artistName
          AND AL_RELEASEDATE BETWEEN :start AND :end
        ORDER BY AL_RELEASEDATE ${validOrder};
        `,
        {
          replacements: { artistName, start, end },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      results[artistName] = albums;
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAlbumsByArtists };
