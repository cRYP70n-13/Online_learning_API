const express = require('express');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3000;

const app = express();

// Load env variables
dotenv.config({ path: './config/config.env' });

app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));