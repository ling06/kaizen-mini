import { EditorYoutubeFrame } from '@/components/EditorYoutubeFrame';
import { IEditorJsData } from '@/shared/types/editorJs.types';
import * as C from '@styles/components';
import { ReactNode } from 'react';


export const useEditorOutput = (editorData: Array<IEditorJsData>): ReactNode[] | null => {
  if (!editorData) {
    return null;
  }
  
  return editorData.map((block) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <C.EditorParagraph
            key={block.id}
            dangerouslySetInnerHTML={{__html: block.data.text || ''}}
          />
        );
      // case 'table':
      //   return (
      //     <C.EditorTabel key={block.id}>
      //       {block.data.content}
      //     </C.EditorTabel>
      //   );
      case 'list':
        if (block.data.style === 'ordered') {
          return (
            <C.UnorderedList key={block.id}>
              {block.data.items?.map((item) => (
                <C.ListItem
                  key={item}
                  dangerouslySetInnerHTML={{__html: item}}
                />
              ))}
            </C.UnorderedList>
          );
        }
        break;
      case 'image':
        return (
          <C.EditorImg
            key={block.id}
            src={block.data.file?.url}
          />
        );
      case 'youtube':
        if (block.data.url) {
          const validUrl = block.data.url.replace('/watch?v=', '/embed/');
          return <EditorYoutubeFrame src={validUrl} />;
        }
        break;
    }
    return null;
  });
};
