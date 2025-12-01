import React, { useState } from 'react';
import {
  Box, Button, DropZone, Text,
} from '@adminjs/design-system';

interface UploadImageProps {
  record?: {
    resourceId?: string;
    id?: string;
  };
}

function UploadImage({ record }: UploadImageProps): React.JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const resourceId = record?.resourceId || 'Article';
  const recordId = record?.id;
  const actionUrl = `/admin/api/resources/${resourceId}/records/${recordId}/edit`;

  const handleFileChange = (files: File[]) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    setUploading(false);

    if (response.ok) {
      const data = await response.json();

      await fetch(actionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featuredImage: data.url }),
      });

      // eslint-disable-next-line no-alert
      alert(`Bilde opplastet: ${data.url}`);
    } else {
      // eslint-disable-next-line no-alert
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
}

export default UploadImage;
