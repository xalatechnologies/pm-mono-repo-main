// options.ts
import AdminJS, { ComponentLoader } from 'adminjs';

import * as AdminJSMongoose from '@adminjs/mongoose';

import Category from '../db/models/Category.js';
import Article from '../db/models/Article.js';

import uploadImageAction from './actions/upload-image.js';

// const componentLoader = new ComponentLoader();
// const UploadImageComponent = componentLoader.add('UploadImage', '../components/upload-image');

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
          createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
          updatedAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
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
          createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
          updatedAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
          featuredImage: {
            //   isVisible: { list: true, filter: false, show: true, edit: true },
            components: {
              edit: Components.FeaturedImageEditor,
              //     list: AdminJS.require('../components/image-preview'),
              //     show: AdminJS.require('../components/image-preview'),
            },
          },
          paragraphs: {
            // Bruk custom komponent for redigering av paragraphs
            components: {
              edit: Components.ParagraphEditor,
              // Du kan også definere en egen visningskomponent (for "show")
              // show: AdminJS.bundle('../components/ParagraphsViewer'),
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

// export { UploadImageComponent };
export default adminOptions;
