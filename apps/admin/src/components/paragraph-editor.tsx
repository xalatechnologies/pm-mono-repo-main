import React, { useState, useEffect } from 'react';
import { Box, Button, DropZone, Label, Input } from '@adminjs/design-system';

interface Paragraph {
  subtitle?: string;
  text: string;
  image?: string;
}

interface ParagraphsEditorProps {
  onChange: (propertyName: string, value: Paragraph[]) => void;
  property: { name: string };
  record: { params: { [key: string]: any } };
}

// Hjelpefunksjon for å rekonstruere nested paragraf-struktur
const getParagraphsFromParams = (params: { [key: string]: any }, propertyName: string): any[] => {
  let paragraphs: any[] = [];
  Object.keys(params).forEach((key) => {
    if (key.startsWith(propertyName + '.')) {
      // Eks: key = "paragraphs.0.subtitle"
      const parts = key.split('.'); // ["paragraphs", "0", "subtitle"]
      const index = parseInt(parts[1], 10);
      if (isNaN(index)) return;
      if (!paragraphs[index]) {
        paragraphs[index] = {};
      }
      // Bruk resten av nøkkel-delen ("subtitle" eller "text")
      const subKey = parts.slice(2).join('.');
      paragraphs[index][subKey] = params[key];
    }
  });
  return paragraphs;
};

const ParagraphsEditor: React.FC<ParagraphsEditorProps> = (props) => {
  const { onChange, property, record } = props;
  // Hent ut den eksisterende verdien for paragraphs. Forventer JSON-streng.
  const initialValue = record.params[property.name] || '[]';

  let parsedParagraphs: Paragraph[];
  try {
    parsedParagraphs = JSON.parse(initialValue);
  } catch (error) {
    parsedParagraphs = [];
  }

  // Hvis vi ikke får noe ut av JSON, prøv å rekonstruere fra flate nøkler
  if (!parsedParagraphs || parsedParagraphs.length === 0) {
    parsedParagraphs = getParagraphsFromParams(record.params, property.name);
  }

  const [paragraphList, setParagraphList] = useState<Paragraph[]>(parsedParagraphs);

  useEffect(() => {
    onChange(property.name, paragraphList);
  }, [paragraphList]);

  const handleFieldChange = (index: number, field: keyof Paragraph, value: string) => {
    const newList = [...paragraphList];
    newList[index] = { ...newList[index], [field]: value };
    setParagraphList(newList);
  };

  const handleAddParagraph = () => {
    setParagraphList([...paragraphList, { subtitle: '', text: '', image: '' }]);
  };

  const handleImageUpload = async (index: number, files: File[]) => {
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
      handleFieldChange(index, 'image', imageUrl);
    } else {
      alert('Opplastning feilet for paragraf');
    }
  };

  return (
    <Box>
      {paragraphList.map((paragraph, index) => (
        <Box key={index} variant="white" p="lg" mb="xl" border="default">
          <Label>Underoverskrift</Label>
          <Input
            value={paragraph.subtitle || ''}
            onChange={(e) => handleFieldChange(index, 'subtitle', e.target.value)}
          />
          <Label>Tekst</Label>
          <Input value={paragraph.text || ''} onChange={(e) => handleFieldChange(index, 'text', e.target.value)} />
          <Label>Bilde</Label>
          <DropZone onChange={(files) => handleImageUpload(index, files)} />
          {paragraph.image && (
            <Box mt="default">
              <img src={paragraph.image} alt="Paragraf bilde" style={{ maxWidth: '200px' }} />
            </Box>
          )}
        </Box>
      ))}
      <Button type="button" variant="primary" onClick={handleAddParagraph}>
        Legg til paragraf2
      </Button>
    </Box>
  );
};

export default ParagraphsEditor;
