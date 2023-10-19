import { useParams } from 'react-router-dom';
import * as S from './styles';
import * as C from '@styles/components';
import { useGetLessonByIdQuery } from '@/store/api/lesson.api';
import { AdminBtn } from '../AdminBtn';
import { useEffect, useState } from 'react';
import { ILesson } from '@/types/lesson.types';
import { ErrorBlock } from '../ErrorBlock';
import { useActions } from '@/hooks/useActions';
import { useCheckLessonMutation } from '@/store/api/lessonTest.api';

interface IEditorLessonData extends Omit<ILesson, 'description'> {
  description: {
    data: {
      text?: string;
      items?: string[];
      style?: string;
      file?: {
        url: string;
      };
    };
    id: string;
    type: string;
  };
}

export function CourseContent() {
  const { setLoaderActive } = useActions();
  const { lessonId } = useParams();
  const [editorData, setEditorData] = useState<Array<IEditorLessonData['description']>>([]);
  const { data, isError, isFetching } = useGetLessonByIdQuery(String(lessonId), {
    skip: lessonId ? false : true,
  });
  const [checkLesson] = useCheckLessonMutation();

  useEffect(() => {
    if (data?.data.description && !isFetching) {
      const parsedData = JSON.parse(data?.data.description);
      setEditorData(parsedData);
    }
    setLoaderActive(isFetching);
  }, [data, isFetching, setLoaderActive]);

  const handleCheckLesson = () => {
    if (data && data.data.id) {
      checkLesson({ id: data.data.id }).then(() => {
        setLoaderActive(false);
      });
      setLoaderActive(true);
    }
  };

  return (
    <>
      {!lessonId && <S.NoOpenLesson>Выберите урок</S.NoOpenLesson>}
      {lessonId && isError && <ErrorBlock />}
      {lessonId && data && (
        <>
          <S.Title as={'h2'}>
            {data.data.title}
            <AdminBtn
              type="edit"
              onClick={() => {}}
            />
          </S.Title>
          <S.Container>
            <S.AdminBtnContainer>
              <AdminBtn
                type="edit"
                onClick={() => {}}
              />
            </S.AdminBtnContainer>
            <S.EditorOutup>
              {editorData.map((block) => {
                if (block.type === 'paragraph') {
                  return <C.EditorParagraph key={block.id}>{block.data.text}</C.EditorParagraph>;
                }
                if (block.type === 'list') {
                  if (block.data.style === 'ordered') {
                    return (
                      <C.UnorderedList key={block.id}>
                        {block.data.items?.map((item) => (
                          <C.ListItem>{item}</C.ListItem>
                        ))}
                      </C.UnorderedList>
                    );
                  }
                }
                if (block.type === 'image') {
                  return <C.EditorImg src={block.data.file?.url} />;
                }
              })}
            </S.EditorOutup>
            {editorData && !isFetching && !data.data.isChecked && (
              <S.ForwardBtn onClick={handleCheckLesson}>Вперёд</S.ForwardBtn>
            )}
          </S.Container>
        </>
      )}
    </>
  );
}
