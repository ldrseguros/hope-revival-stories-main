const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const uploadHandler = require('./api/upload.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/upload', uploadHandler);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 