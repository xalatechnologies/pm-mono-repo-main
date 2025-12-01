import React, { useState, useEffect } from 'react';
import {
  Box, Button, DropZone, Label, Input,
} from '@adminjs/design-system';

interface Paragraph {
  subtitle?: string;
  text: string;
  image?: string;
}

interface ParagraphsEditorProps {
  onChange: (propertyName: string, value: Paragraph[]) => void;
  property: { name: string };
  record: { params: Record<string, unknown> };
}

// Helper function to reconstruct nested paragraph structure
const getParagraphsFromParams = (
  params: Record<string, unknown>,
  propertyName: string,
): Paragraph[] => {
  const paragraphs: Paragraph[] = [];
  Object.keys(params).forEach((key) => {
    if (key.startsWith(`${propertyName}.`)) {
      const parts = key.split('.');
      const index = parseInt(parts[1], 10);
      if (Number.isNaN(index)) return;
      if (!paragraphs[index]) {
        paragraphs[index] = { text: '' };
      }
      const subKey = parts.slice(2).join('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (paragraphs[index] as any)[subKey] = params[key];
    }
  });
  return paragraphs;
};

function ParagraphsEditor(props: ParagraphsEditorProps): React.JSX.Element {
  const { onChange, property, record } = props;
  const initialValue = (record.params[property.name] as string) || '[]';

  let parsedParagraphs: Paragraph[];
  try {
    parsedParagraphs = JSON.parse(initialValue);
  } catch {
    parsedParagraphs = [];
  }

  if (!parsedParagraphs || parsedParagraphs.length === 0) {
    parsedParagraphs = getParagraphsFromParams(record.params, property.name);
  }

  const [paragraphList, setParagraphList] = useState<Paragraph[]>(parsedParagraphs);

  useEffect(() => {
    onChange(property.name, paragraphList);
  }, [paragraphList, onChange, property.name]);

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

    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (uploadResponse.ok) {
      const data = await uploadResponse.json();
      const imageUrl = data.url;
      handleFieldChange(index, 'image', imageUrl);
    } else {
      // eslint-disable-next-line no-alert
      alert('Opplastning feilet for paragraf');
    }
  };

  return (
    <Box>
      {paragraphList.map((paragraph, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={`paragraph-${index}`} variant="white" p="lg" mb="xl" border="default">
          <Label>Underoverskrift</Label>
          <Input
            value={paragraph.subtitle || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(index, 'subtitle', e.target.value)}
          />
          <Label>Tekst</Label>
          <Input
            value={paragraph.text || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(index, 'text', e.target.value)}
          />
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
        Legg til paragraf
      </Button>
    </Box>
  );
}

export default ParagraphsEditor;
