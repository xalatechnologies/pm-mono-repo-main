import React, { useState, useEffect } from 'react';
import { Box, Button, DropZone, Label, Input } from '@adminjs/design-system';

interface ParagraphsEditorProps {
  onChange: (propertyName: string, value: string) => void;
  property: { name: string };
  record: { params: { [key: string]: any } };
}

const FeaturedImageEditor: React.FC<ParagraphsEditorProps> = (props) => {
  const { onChange, property, record } = props;
  const initialValue = record.params[property.name] || '';

  const [imageUrl, setImageUrl] = useState<string>(initialValue);

  useEffect(() => {
    onChange(property.name, imageUrl);
  }, [imageUrl]);

  const handleImageUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const formData = new FormData();
    formData.append('image', file);

    // Bruk ditt API-endepunkt for filopplasting (f.eks. /api/upload)
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (uploadResponse.ok) {
      const data = await uploadResponse.json();
      const imageUrl = data.url;
      // Oppdater den aktuelle paragrafens image-felt
      setImageUrl(imageUrl);
    } else {
      alert('Opplastning feilet for paragraf');
    }
  };

  return (
    <Box>
      <Box variant="white" p="lg" mb="xl" border="default">
        <Label>Bilde</Label>
        <DropZone onChange={(files) => handleImageUpload(files)} />
        {imageUrl && (
          <Box mt="default">
            <img src={imageUrl} alt="Featured image" style={{ maxWidth: '200px' }} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FeaturedImageEditor;
