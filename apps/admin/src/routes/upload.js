// src/routes/upload.js:
import express from 'express';
import multer from 'multer';
import { BlobServiceClient } from '@azure/storage-blob';
import 'dotenv/config';

const router = express.Router();

// Configure multer with memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Get environment variables for Azure Blob Storage
const { AZURE_STORAGE_CONNECTION_STRING } = process.env;
const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER || 'images';

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error('AZURE_STORAGE_CONNECTION_STRING må være definert');
}

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Ingen fil mottatt' });
  }

  // Generate unique filename
  const blobName = `${Date.now()}-${req.file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    // Upload file buffer to Azure Blob Storage
    await blockBlobClient.uploadData(req.file.buffer, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype },
    });
    // Return URL for uploaded image
    return res.status(200).json({ url: blockBlobClient.url });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Opplastningsfeil:', error);
    return res.status(500).json({ message: 'Opplastning feilet' });
  }
});

export default router;
