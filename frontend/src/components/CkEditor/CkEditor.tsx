import { CKEditor } from '@ckeditor/ckeditor5-react';
// import '../../../ckEditor5/build/ckeditor'
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { UploadAdapter, FileLoader } from '@ckeditor/ckeditor5-upload/src/filerepository';
import { Editor } from '@ckeditor/ckeditor5-core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './styles';

// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

function uploadAdapter(loader: FileLoader): UploadAdapter {
  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          const response = await axios.request({
            method: 'POST',
            url: `/api/course/upload-temp-image`,
            data: {
              image: file,
            },
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRF-Token': csrf,
            },
          });
          resolve({
            default: response.data.file.url,
          });
        } catch (error) {
          reject('Hello');
        }
      });
    },
    abort: () => {},
  };
}
function uploadPlugin(editor: Editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

interface ICkEditorProps {
  onChange: (data: string) => void;
  data: string;
  type: string;
}

export function CkEditor({ onChange, data, type }: ICkEditorProps) {
  const [editor, setEditor] = useState('');

  useEffect(() => {
    if (data && type === 'edit') {
      setEditor(data);
    }
  }, [data, type]);

  return (
    <S.CkEditorContainer>
      <CKEditor
        editor={ClassicEditor}
        config={{ extraPlugins: [uploadPlugin] }}
        data={editor}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          setEditor(editor.getData());
          onChange(editor.getData());
        }}
        onBlur={(event, editor) => {
          // console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          // console.log('Focus.', editor);
        }}
      />
    </S.CkEditorContainer>
  );
}
