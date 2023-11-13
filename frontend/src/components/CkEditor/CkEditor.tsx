import { CKEditor } from '@ckeditor/ckeditor5-react';
// import '../../../ckEditor5/build/ckeditor'
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { UploadAdapter, FileLoader } from "@ckeditor/ckeditor5-upload/src/filerepository";
import { Editor } from "@ckeditor/ckeditor5-core";
import { useState } from 'react';
import axios from "axios";

// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

function uploadAdapter(loader: FileLoader): UploadAdapter {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          const response = await axios.request({
            method: "POST",
            url: `${'http://localhost:8080'}/upload_files`,
            data: {
              files: file
            },
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          resolve({
            default: `${'http://localhost:8080'}/${response.data.filename}`
          });
        } catch (error) {
          reject("Hello");
        }
      });
    },
    abort: () => {}
  };
}
function uploadPlugin(editor: Editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

export function CkEditor({ onChange }) {
  const [editor, setEditor] = useState(
    "<p>Hello world</p><img src='https://images.unsplash.com/photo-1673859360509-1ef362f94f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NjMzNjE2OA&ixlib=rb-4.0.3&q=80&w=1080' />"
  );
  return (
    <>

<CKEditor
  editor={ClassicEditor}
  config={{extraPlugins: [uploadPlugin]}}
  data={editor}
  onReady={(editor) => {
    console.log('Editor is ready to use!', editor);
  }}
  onChange={(event, editor) => {
    setEditor(editor.getData());
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
