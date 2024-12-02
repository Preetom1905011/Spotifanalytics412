const sequelize = require('../config/database');

const getArtists = async (req, res) => {
  try {
    const artists = await sequelize.query(`
        SELECT DISTINCT p_id, p_name FROM PERSON
        WHERE p_type = 'artist'
        ORDER BY p_name ASC;
    `, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json(artists); // Return the result array directly without destructuring
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getArtists };
