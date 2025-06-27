const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const uploadHandler = require('./api/upload.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota de upload
app.post('/api/upload', uploadHandler);

// Rota de healthcheck
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Servir frontend (se necessário)
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = app; 