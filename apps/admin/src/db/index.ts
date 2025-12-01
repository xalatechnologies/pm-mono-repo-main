// packages/db/index.ts
import mongoose from 'mongoose';

import Category from './models/Category.js';
import Article from './models/Article.js';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI må være definert i miljøvariablene');
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: CachedConnection;
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongooseCache;

export async function connectToDatabase(): Promise<typeof mongoose> {
  // Check if cached connection exists and is active
  if (cached.conn && cached.conn.connection.readyState === 1) {
    // eslint-disable-next-line no-console
    console.log('Using cached database connection with readyState === 1');
    return cached.conn;
  }
  if (!cached.promise && MONGODB_URI) {
    // eslint-disable-next-line no-console
    console.log('Creating new database connection promise');
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 30000,
      })
      .then((mongooseInstance) => {
        // eslint-disable-next-line no-console
        console.log('Database connection established');
        return mongooseInstance;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn!;
}

export { Category, Article };
export default { connectToDatabase, Category, Article };
