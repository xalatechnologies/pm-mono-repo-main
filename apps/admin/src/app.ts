import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter, buildRouter } from '@adminjs/express';


import { connectToDatabase } from './db/index.js'; 


import * as AdminJSMongoose from '@adminjs/mongoose';
import uploadRouter from './routes/upload.js';

// import { Category } from './db/category.entity.js';

import provider from './admin/auth-provider.js';
// import initializeDb from './db/index.js';
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

  // await initializeDb();

  const admin = new AdminJS(options);
  // const adminOptions = {
  //   resources: [Category],
  // };
  // const admin = new AdminJS(adminOptions);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  let router;

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
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
