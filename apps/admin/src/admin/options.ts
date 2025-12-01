// options.ts
import * as AdminJSMongoose from '@adminjs/mongoose';
import AdminJS from 'adminjs';

import Category from '../db/models/Category.js';

import Article from '../db/models/Article.js';
import uploadImageAction from './actions/upload-image.js';
import { componentLoader, Components } from './component-loader.js';

AdminJS.registerAdapter(AdminJSMongoose);

const adminOptions = {
  rootPath: '/admin',
  resources: [
    {
      resource: Category,
      options: {
        parent: { name: 'Innhold' },
        properties: {
          _id: { isVisible: false },
          createdAt: {
            isVisible: {
              list: true, filter: true, show: true, edit: false,
            },
          },
          updatedAt: {
            isVisible: {
              list: true, filter: true, show: true, edit: false,
            },
          },
        },
      },
    },
    {
      resource: Article,
      options: {
        actions: {
          uploadImage: uploadImageAction,
        },
        parent: { name: 'Innhold' },
        properties: {
          _id: { isVisible: false },
          createdAt: {
            isVisible: {
              list: true, filter: true, show: true, edit: false,
            },
          },
          updatedAt: {
            isVisible: {
              list: true, filter: true, show: true, edit: false,
            },
          },
          featuredImage: {
            components: {
              edit: Components.FeaturedImageEditor,
            },
          },
          paragraphs: {
            components: {
              edit: Components.ParagraphEditor,
            },
          },
        },
      },
    },
  ],
  branding: {
    companyName: 'Pureminerals',
    softwareBrothers: false,
  },
  componentLoader,
};

export default adminOptions;
