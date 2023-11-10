import { EditorYoutubeFrame } from '@/components/EditorYoutubeFrame';
import { IEditorJsData } from '@/types/editorJs.types';
import * as C from '@styles/components';

export const useEditorOutput = (editorData: Array<IEditorJsData>) => {
  console.log('editorData', editorData)
  if (!editorData) return null;
  return editorData.map((block) => {
    if (block.type === 'paragraph') {
      return <C.EditorParagraph key={block.id}>{block.data.text}</C.EditorParagraph>;
    }
    if (block.type === 'table') {       
      return <C.EditorTabel key={block.id}>{block.data.content}</C.EditorTabel>;
    }
    if (block.type === 'list' && block.data.style === 'ordered') {
      return (
        <C.UnorderedList key={block.id}>
          {block.data.items?.map((item) => (
            <C.ListItem key={item}>{item}</C.ListItem>
          ))}
        </C.UnorderedList>
      );
    }
    if (block.type === 'image') {
      return (
        <C.EditorImg
          key={block.id}
          src={block.data.file?.url}
        />
      );
    }
    if (block.type === 'youtube' && block.data.url) {
      const validUrl = block.data.url.replace('/watch?v=', '/embed/');
      return <EditorYoutubeFrame src={validUrl} />;
    }
    return null;
  });
};
