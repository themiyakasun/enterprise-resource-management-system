const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');
const authMiddleware = require('./middlewares/authMiddleware.js');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);

app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000');
  await sequelize.sync({ alter: true });
  console.log('DB Synced');
});
