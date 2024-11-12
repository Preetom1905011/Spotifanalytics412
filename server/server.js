// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const trackRoutes = require('./routes/tracks');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "it's working" });
});
app.use('/api', trackRoutes);

// sequelize.sync().then(() => {
//   console.log('Database connected!');
// }).catch(error => console.error('Error connecting to the database:', error));

// Test database connection
sequelize.authenticate().then(() => {
    console.log('Connection to the PostgreSQL database has been established successfully.');
}).catch(error => {
    console.error('Unable to connect to the PostgreSQL database:', error);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
