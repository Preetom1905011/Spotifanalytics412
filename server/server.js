// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);

// Connect to PostgreSQL and sync models
sequelize.sync().then(() => {
  console.log('Database & tables created!');
}).catch(error => console.error('Error connecting to the database:', error));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
