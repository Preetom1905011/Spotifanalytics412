const sequelize = require('../config/database');

const getTracksByArtist = async (req, res) => {
  const { artistName, limit = 10 } = req.query; 

  try {
    const tracks = await sequelize.query(`
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
      ORDER BY TR_POPULARITY DESC
      LIMIT :limit;
    `, {
      replacements: { artistName, limit: parseInt(limit, 10) },
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json(tracks); // Return the result array directly without destructuring
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTracksByArtist };
