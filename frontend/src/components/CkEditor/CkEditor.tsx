import * as S from './styles';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '../../../ckEditor5/build/ckeditor'
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const configEditor = {
  simpleUpload: {
    uploadUrl: '/api/course/upload-temp-image',
  },
}

export function CkEditor({ onChange }) {
  return (
    <>

<CKEditor
  editor={ClassicEditor}
  config={
    configEditor
  }
  data="<p>Hello from CKEditor&nbsp;5!</p>"
  onReady={(editor) => {
    console.log('Editor is ready to use!', editor);
  }}
  onChange={(event, editor) => {
    const data = editor.getData();
    onChange(data);
  }}
  onBlur={(event, editor) => {
    console.log('Blur.', editor);
  }}
  onFocus={(event, editor) => {
    console.log('Focus.', editor);
  }}
/>
    </>
  );
}
