const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const uploadHandler = require('./api/upload.js');

dotenv.config();

console.log('Servidor Express inicializado');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota de upload com log
app.post('/api/upload', (req, res, next) => {
  console.log('Rota /api/upload chamada');
  uploadHandler(req, res, next);
});

// Rota de healthcheck
app.get('/api/health', (req, res) => {
  console.log('Healthcheck chamado');
  res.status(200).json({ status: 'OK' });
});

// Servir frontend (se necessário)
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
  console.log('Rota catch-all chamada');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = app; 