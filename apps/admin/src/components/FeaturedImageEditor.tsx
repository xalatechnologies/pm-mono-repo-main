import React, { useState, useEffect } from 'react';
import {
  Box, DropZone, Label,
} from '@adminjs/design-system';

interface FeaturedImageEditorProps {
  onChange: (propertyName: string, value: string) => void;
  property: { name: string };
  record: { params: Record<string, unknown> };
}

function FeaturedImageEditor(props: FeaturedImageEditorProps): React.JSX.Element {
  const { onChange, property, record } = props;
  const initialValue = (record.params[property.name] as string) || '';

  const [currentImageUrl, setCurrentImageUrl] = useState<string>(initialValue);

  useEffect(() => {
    onChange(property.name, currentImageUrl);
  }, [currentImageUrl, onChange, property.name]);

  const handleImageUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const formData = new FormData();
    formData.append('image', file);

    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (uploadResponse.ok) {
      const data = await uploadResponse.json();
      const uploadedUrl = data.url;
      setCurrentImageUrl(uploadedUrl);
    } else {
      // eslint-disable-next-line no-alert
      alert('Opplastning feilet for paragraf');
    }
  };

  return (
    <Box>
      <Box variant="white" p="lg" mb="xl" border="default">
        <Label>Bilde</Label>
        <DropZone onChange={(files) => handleImageUpload(files)} />
        {currentImageUrl && (
          <Box mt="default">
            <img src={currentImageUrl} alt="Featured" style={{ maxWidth: '200px' }} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default FeaturedImageEditor;
