import { Router } from 'express';

import Article from '../db/models/Article.js';

const router = Router();

router.get('/', async (_req, res) => {
  const docs = await Article.find().lean();
  const result = docs.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));
  res.json(result);
});

export default router;
