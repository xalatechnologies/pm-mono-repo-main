import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

// Registrer komponenten og få et referansenavn
// const UploadImageComponent = componentLoader.add('UploadImage', './components/upload-image');
const Components = {
  ParagraphEditor: componentLoader.add('ParagraphEditor', '../components/paragraph-editor'),
  UploadImageComponent: componentLoader.add('UploadImage', '../components/upload-image'),
  FeaturedImageEditor: componentLoader.add('FeaturedImageEditor', '../components/FeaturedImageEditor'),
  // other custom components
};

export { componentLoader, Components };
