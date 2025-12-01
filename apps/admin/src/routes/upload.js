// src/routes/upload.js:
import express from 'express';
import multer from 'multer';
import { BlobServiceClient } from '@azure/storage-blob';
import 'dotenv/config';

const router = express.Router();

// Konfigurer multer med memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Hent miljøvariabler for Azure Blob Storage
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER || 'images';

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error('AZURE_STORAGE_CONNECTION_STRING må være definert');
}

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Ingen fil mottatt' });

  // Generer et unikt filnavn (for eksempel)
  const blobName = `${Date.now()}-${req.file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    // Last opp filbufferen til Azure Blob Storage
    await blockBlobClient.uploadData(req.file.buffer, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype },
    });
    // Returner URL for det opplastede bildet
    res.status(200).json({ url: blockBlobClient.url });
  } catch (error) {
    console.error('Opplastningsfeil:', error);
    res.status(500).json({ message: 'Opplastning feilet' });
  }
});

export default router;
