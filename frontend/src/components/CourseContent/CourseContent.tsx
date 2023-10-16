import { useParams } from 'react-router-dom';
import * as S from './styles';
import * as C from '@styles/components';
import { useGetLessonByIdQuery } from '@/store/api/lesson.api';
import { AdminBtn } from '../AdminBtn';
import { useEffect, useState } from 'react';
import { ILesson } from '@/types/lesson.types';
import { ErrorBlock } from '../ErrorBlock';
import { Loading } from '../Loading';

interface IEditorLessonData extends Omit<ILesson, 'description'> {
  description: {
    data: {
      text?: string;
      items?: string[];
      style?: string;
    };
    id: string;
    type: string;
  };
}

export function CourseContent() {
  const { lessonId } = useParams();
  const [editorData, setEditorData] = useState<Array<IEditorLessonData['description']>>([]);
  const { data, isError, isLoading, isFetching } = useGetLessonByIdQuery(lessonId || '');

  useEffect(() => {
    if (data?.data.description && !isFetching) {
      const parsedData = JSON.parse(data?.data.description);
      setEditorData(parsedData);
    } else if (!isFetching) {
      setEditorData([]);
    }
  }, [data, isFetching]);

  console.log(editorData);

  return (
    <>
      {!lessonId && <S.NoOpenLesson>Выберите урок</S.NoOpenLesson>}
      {lessonId && isError && <ErrorBlock />}
      {lessonId && data && (
        <>
        {(isLoading || isFetching) && <Loading/>}
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
                  return <C.EditorParagraph>{block.data.text}</C.EditorParagraph>;
                }
                if (block.type === 'list') {
                  if (block.data.style === 'ordered') {
                    return (
                      <S.UnorderedList>
                        {block.data.items?.map((item) => (
                          <S.ListItem>{item}</S.ListItem>
                        ))}
                      </S.UnorderedList>
                    );
                  }
                }
              })}
            </S.EditorOutup>
          </S.Container>
        </>
      )}
    </>
  );
}
