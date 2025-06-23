import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { google } from 'googleapis';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

const KEYFILEPATH = process.env.GOOGLE_SERVICE_ACCOUNT;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

// Permite receber outros campos do formulário além do vídeo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Verificação de Variáveis de Ambiente
if (!FOLDER_ID || !KEYFILEPATH) {
  console.error("ERRO CRÍTICO: As variáveis de ambiente GOOGLE_DRIVE_FOLDER_ID e GOOGLE_SERVICE_ACCOUNT não foram definidas no arquivo .env. O servidor não pode iniciar.");
  process.exit(1); // Encerra o processo com código de erro
}

async function uploadFileToDrive(drive, file) {
  const filePath = path.join(__dirname, 'uploads/', file.filename);
  const fileMetadata = {
    name: file.originalname,
    parents: [FOLDER_ID],
  };
  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(filePath),
  };

  try {
    const uploadedFile = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    fs.unlinkSync(filePath); // Remove o arquivo temporário
    return uploadedFile.data.id;
  } catch (error) {
    console.error(`Erro ao fazer upload do arquivo ${file.originalname}:`, error);
    fs.unlinkSync(filePath); // Garante a remoção mesmo em caso de erro
    throw error; // Propaga o erro
  }
}

app.post('/upload', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'terms', maxCount: 1 }]), async (req, res) => {
  console.log("Recebida requisição de upload...");
  try {
    const videoFile = req.files.video[0];
    const termsFile = req.files.terms[0];

    if (!videoFile || !termsFile) {
      return res.status(400).send('Vídeo e termo de uso são obrigatórios.');
    }

    console.log("Autenticando com o Google...");
    const drive = google.drive({ version: 'v3', auth });
    console.log("Autenticação bem-sucedida.");

    // Fazendo upload de ambos os arquivos em paralelo
    console.log("Iniciando upload para o Google Drive...");
    const [video_drive_id, terms_drive_id] = await Promise.all([
      uploadFileToDrive(drive, videoFile),
      uploadFileToDrive(drive, termsFile),
    ]);
    console.log("Uploads concluídos. Video ID:", video_drive_id, "Terms ID:", terms_drive_id);

    // Dados do formulário
    const { nome, email, telefone, rg, cpf, endereco, nacionalidade, estadoCivil, profissao, relacao, descricao } = req.body;

    // Salva no banco com Prisma
    await prisma.depoimento.create({
      data: {
        nome,
        email,
        telefone,
        rg,
        cpf,
        endereco,
        nacionalidade,
        estadoCivil,
        profissao,
        relacao,
        descricao,
        video_drive_id,
        terms_drive_id,
      },
    });

    console.log(`Depoimento de ${nome} salvo com sucesso no banco de dados.`);
    res.status(200).json({ videoId: video_drive_id, termsId: terms_drive_id });
  } catch (error) {
    console.error("Erro detalhado no endpoint /upload:", error);
    res.status(500).send(error.message);
  }
});

app.listen(3001, () => console.log('Servidor rodando na porta 3001')); 