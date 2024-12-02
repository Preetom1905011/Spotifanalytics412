const sequelize = require('../config/database');

const getArtists = async (req, res) => {
  try {
    const artists = await sequelize.query(`
        SELECT DISTINCT p_id, p_name FROM PERSON
        WHERE p_type = 'artist'
        ORDER BY p_name ASC;

        SELECT DISTINCT
          P_NAME, AR_POPULARITY
        FROM 
            PERSON
        JOIN 
            ARTIST ON PERSON.P_ID = ARTIST.AR_ID
        WHERE 
            'k-pop' = ANY(ARTIST.AR_GENRE)
        ORDER BY AR_POPULARITY DESC;

    `, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json(artists); // Return the result array directly without destructuring
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getArtists };
