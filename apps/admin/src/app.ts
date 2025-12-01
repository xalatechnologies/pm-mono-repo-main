import * as AdminJSMongoose from '@adminjs/mongoose';
import { buildAuthenticatedRouter, buildRouter } from '@adminjs/express';
import express from 'express';
import AdminJS from 'adminjs';

import { connectToDatabase } from './db/index.js';
import uploadRouter from './routes/upload.js';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import articleRoutes from './routes/articles.js';

const port = process.env.PORT || 3000;

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const start = async () => {
  const app = express();

  await connectToDatabase();

  app.use('/api/articles', articleRoutes);
  app.use('/api', uploadRouter);

  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  let router;

  // eslint-disable-next-line no-console
  console.log('node env', process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'development1') {
    // I development trenger du ikke autentisering
    router = buildRouter(admin);
  } else {
    router = buildAuthenticatedRouter(
      admin,
      {
        cookiePassword: process.env.COOKIE_SECRET,
        cookieName: 'adminjs',
        provider,
      },
      null,
      {
        secret: process.env.COOKIE_SECRET,
        saveUninitialized: true,
        resave: true,
      },
    );
  }

  app.use(admin.options.rootPath, router);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
