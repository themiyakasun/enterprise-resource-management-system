const express = require('express');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

app.use(express.json());

app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000');
  await sequelize.sync({ alter: true });
  console.log('DB Synced');
});
