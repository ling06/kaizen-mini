import { useParams } from 'react-router-dom';
import * as S from './styles';
import * as C from '@styles/components';
import { useCheckLessonMutation, useGetLessonByIdQuery } from '@/store/api/lesson.api';
import { AdminBtn } from '../AdminBtn';
import { useEffect, useMemo, useState } from 'react';
import { ILesson } from '@/types/lesson.types';
import { ErrorBlock } from '../ErrorBlock';
import { useActions } from '@/hooks/useActions';
import { LessonTest } from '../LessonTest';

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
    skip: !lessonId, 
  });
  const [checkLesson] = useCheckLessonMutation();
  const [isForwardBtnDisabled, setIsForwardBtnDisabled] = useState<boolean>(true);

  const isTestsPassed = useMemo(() => {
    if (data?.data.tests && data?.data.tests.length > 0) {
      return data?.data.tests.every((test) => test.userTestAnswer);
    }
  }, [data?.data.tests]);

  useEffect(() => {
    if (
      isFetching ||
      data?.data.isChecked ||
      (data?.data.tests && data?.data.tests.length > 0 && !isTestsPassed)
    ) {
      setIsForwardBtnDisabled(true);
    } else {
      setIsForwardBtnDisabled(false);
    }
  }, [data?.data.isChecked, data?.data.tests, isFetching, isTestsPassed]);

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

  const renderEditorOutput = () => {
    return editorData.map((block) => {
      if (block.type === 'paragraph') {
        return <C.EditorParagraph key={block.id}>{block.data.text}</C.EditorParagraph>;
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
      return null;
    });
  };

  const renderLessonTests = () => {
    return data?.data.tests.map((test) => (
      <LessonTest
        key={test.id}
        data={test}
      />
    ));
  };

  const renderForwardButton = () => {
    return (
      <S.ForwardBtn
        onClick={handleCheckLesson}
        disabled={isForwardBtnDisabled}>
        Вперёд
      </S.ForwardBtn>
    );
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
              popupName="Урок"
              type="edit"
              onClick={() => {}}
            />
          </S.Title>
          <S.Container>
            <S.EditorOutput>{renderEditorOutput()}</S.EditorOutput>
            {data.data.tests.length > 0 && renderLessonTests()}
            {editorData && !isFetching && !data.data.isChecked && renderForwardButton()}
          </S.Container>
        </>
      )}
    </>
  );
}

