const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000');
});
