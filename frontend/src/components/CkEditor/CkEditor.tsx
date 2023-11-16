import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import { useEffect, useState } from 'react';
import * as S from './styles';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface ICkEditorProps {
  onChange: (data: string) => void;
  data?: string;
  type: string;
}

export function CkEditor({ onChange, data="" }: ICkEditorProps) {
  const [editor, setEditor] = useState(data);
  const { token } = useTypedSelector((state) => state.auth);

  return (
    <S.CkEditorContainer>
      <CKEditor
        editor={Editor.Editor}
        data={editor}
        config={{
          removePlugins: ['ImageInsert', 'AutoFormat', 'Markdown'],
          simpleUpload: {
            uploadUrl: '/api/course/upload-temp-image',
            headers: {
              'X-CSRF-Token': token || '',
            },
          },
          mediaEmbed: {
            previewsInData: true,
          },
        }}
        onReady={(editor) => {
          console.log('Editor is ready to use!');
        }}
        onChange={(event, editor) => {
          setEditor(editor.getData());
          onChange(editor.getData());
        }}
        onBlur={(event, editor) => {
          setEditor(editor.getData());
          onChange(editor.getData());
        }}
        onError={(error) => console.error('Error in CkEditor:', error)}
      />
    </S.CkEditorContainer>
  );
}
