// packages/db/index.ts
import mongoose from 'mongoose';

// Importer modellene dine
import Category from './models/Category.js';
import Article from './models/Article.js';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI må være definert i miljøvariablene');
}

let cached = (globalThis as any).mongoose;
if (!cached) {
  cached = (globalThis as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // Sjekk først om det finnes en cachet forbindelse og om den er aktiv
  if (cached.conn && cached.conn.connection.readyState === 1) {
    console.log('Using cached database connection with readyState === 1');
    return cached.conn;
  }
  if (!cached.promise && MONGODB_URI) {
    console.log('Creating new database connection promise');
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // Du kan legge til konfigurasjon her hvis nødvendig
        bufferCommands: false,
        serverSelectionTimeoutMS: 30000, // øker timeout til 30 sekunder
      })
      .then((mongoose) => {
        console.log('Database connection established');
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Eksporter funksjoner og modeller slik at andre prosjekter kan bruke dem
export { Category, Article };
export default { connectToDatabase, Category, Article };
