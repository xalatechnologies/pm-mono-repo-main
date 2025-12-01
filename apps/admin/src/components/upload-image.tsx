// src/admin/components/upload-image.tsx
import React, { useState } from 'react';
import { Box, Button, DropZone, Text } from '@adminjs/design-system';

const UploadImage = (props) => {
  console.log('props1', props);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { record, resource, action, onSubmit } = props;

  console.log('onSubmit', onSubmit);

  const resourceId = record?.resourceId || 'Article';
  const recordId = record?.id;
  const actionName = 'uploadImage';
  // const actionUrl = `/admin/api/resources/${resourceId}/records/${recordId}/actions/${actionName}`;
  const actionUrl = `/admin/api/resources/${resourceId}/records/${recordId}/edit`;
  // window.location.pathname

  const handleFileChange = (files: File[]) => {
    // DropZone sender en array med filer; ta den første
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = async (props) => {
    if (!file) return;
    setUploading(true);

    // Opprett FormData for filopplastning
    const formData = new FormData();
    formData.append('image', file);

    // Utfør et API-kall til din backend-route for filopplasting
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    setUploading(false);

    if (response.ok) {
      const data = await response.json();
      // Forvent at data.url er URL-en til det opplastede bildet
      // Her kan du eventuelt gjøre noe med URL-en, f.eks. sende den tilbake til action-handleren

      // Steg 2: Kall AdminJS sin custom action med imageUrl
      // window.location.pathname refererer til den nåværende AdminJS action-ruten.
      const updateResponse = await fetch(actionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featuredImage: data.url }),
      });

      console.log('updateResponse', updateResponse);

      alert(`Bilde opplastet: ${data.url}`);
      // Om du ønsker å oppdatere posten direkte via AdminJS, kan du sende URL-en tilbake
      // til action-handleren på en eller annen måte (f.eks. lagre den i en hidden input).
      // window.location.reload(); // Oppdater visningen (kan finjusteres)
    } else {
      alert('Bildeopplasting feilet');
    }
  };

  return (
    <Box variant="grey">
      <Text variant="lg">Last opp bilde</Text>
      <DropZone onChange={handleFileChange} />
      <Button variant="primary" onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Laster opp...' : 'Last opp'}
      </Button>
    </Box>
  );
};

export default UploadImage;
