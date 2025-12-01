// admin/actions/upload-image.ts
import { ActionRequest, ActionResponse, ActionContext } from 'adminjs';

import { Components } from '../component-loader.js';

const uploadImageAction = {
  actionType: 'record',
  icon: 'Upload',
  label: 'Upl Image2',
  isVisible: true,
  handler: async (request: ActionRequest, response: ActionResponse, context: ActionContext) => {
    const { record } = context;
    // eslint-disable-next-line no-console
    console.log('handler');
    if (!record) {
      throw new Error('Record is required');
    }
    if (request.method === 'post') {
      const { featuredImage } = request.payload;
      if (!featuredImage) {
        return {
          record: record.toJSON(context.currentAdmin),
          notice: { message: 'Ingen bilde-URL mottatt', type: 'error' },
        };
      }

      await record.update({ featuredImage });
      return {
        record: record.toJSON(context.currentAdmin),
        notice: { message: 'Bilde opplastet og lagret!', type: 'success' },
      };
    }
    // eslint-disable-next-line no-console
    console.log('context.currentAdmin', context.currentAdmin);
    return {
      record: record.toJSON(context.currentAdmin),
    };
  },
  component: Components.UploadImageComponent,
};

export default uploadImageAction;
