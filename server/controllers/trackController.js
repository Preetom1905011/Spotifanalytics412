const sequelize = require('../config/database');

const getTracksByArtists = async (req, res) => {
  const { artistNames = [], limit = 10, order = 'desc' } = req.query;

  try {
    // Validate and sanitize input
    const validOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
    const artistList = Array.isArray(artistNames) ? artistNames : [artistNames];

    if (artistList.length === 0) {
      return res.status(400).json({ message: "Please provide at least one artist name." });
    }

    const results = {};

    // Fetch tracks for each artist
    for (const artistName of artistList) {
      const tracks = await sequelize.query(
        `
        SELECT DISTINCT
          TR_ID, TR_NAME, TR_POPULARITY
        FROM 
          TRACKS
        JOIN 
          ARTIST ON TRACKS.TR_ARTIST_ID = ARTIST.AR_ID
        JOIN 
          PERSON ON PERSON.P_ID = ARTIST.AR_ID
        WHERE 
          PERSON.P_NAME = :artistName
        ORDER BY TR_POPULARITY ${validOrder}
        LIMIT :limit;
        `,
        {
          replacements: { artistName, limit: parseInt(limit, 10) },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      results[artistName] = tracks;
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTracksByArtists };
