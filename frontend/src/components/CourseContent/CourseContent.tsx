import { generatePath, useNavigate, useParams } from 'react-router-dom';
import * as S from './styles';
import {
  useCheckLessonMutation,
  useDeleteLessonMutation,
  useGetLessonByIdQuery,
  useRestoreLessonMutation,
} from '@/store/api/lesson.api';
import { AdminBtn } from '../AdminBtn';
import { CkEditorOutput } from '../CkEditorOutput';
import { useEffect, useMemo, useState } from 'react';
import { ErrorBlock } from '../ErrorBlock';
import { useActions } from '@/hooks/useActions';
import { LessonTest } from '../LessonTest';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MediaQueries } from '@/constants';

export function CourseContent() {
  const { setLoaderActive } = useActions();
  const { courseId, lessonId, chapterId } = useParams();
  const [deleteLesson] = useDeleteLessonMutation();
  const [restoreLesson] = useRestoreLessonMutation();
  const { data, isError, isFetching } = useGetLessonByIdQuery(String(lessonId), {
    skip: !lessonId,
  });
  const [checkLesson] = useCheckLessonMutation();
  const [isForwardBtnDisabled, setIsForwardBtnDisabled] = useState<boolean>(true);
  const isMobile = useMediaQuery(MediaQueries.mobile);
  const navigate = useNavigate();

  const isTestsPassed = useMemo(() => {
    if (data?.data.tests && data?.data.tests.length > 0) {
      return data?.data.tests.every((test) => test.userTestAnswer);
    }
  }, [data?.data.tests]);

  useEffect(() => {
    setLoaderActive(isFetching);
    if (
      isFetching ||
      data?.data.isChecked ||
      (data?.data.tests && data?.data.tests.length > 0 && !isTestsPassed)
    ) {
      setIsForwardBtnDisabled(true);
    } else {
      setIsForwardBtnDisabled(false);
    }
  }, [data?.data.isChecked, data?.data.tests, isFetching, isTestsPassed, setLoaderActive]);

  const handleCheckLesson = () => {
    if (data && data.data.id) {
      checkLesson({ id: data.data.id }).then((res) => {
        if('error' in res || 'data' in res && !res.data.result) {
          alert('При прохождении урока произошла ошибка!');
        }
        setLoaderActive(false);
      });
      setLoaderActive(true);
    }
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

  const handleEditLesson = () => {
    if (data) {
      navigate(
        generatePath(`/courses/:courseId/:chapterId/:themeId/:lessonId/edit-lesson`, {
          courseId: String(courseId),
          chapterId: String(chapterId),
          themeId: String(data.data.theme_id),
          lessonId: String(data.data.id),
        })
      );
    }
  };

  const handleDeleteLesson = () => {
    if (!data) return;
    deleteLesson({
      id: Number(data.data.id),
    });
    setLoaderActive(true);
  };

  const handleRestoreLesson = () => {
    if (!data) return;
    restoreLesson({
      id: Number(data.data.id),
    });
    setLoaderActive(true);
  };

  return (
    <>
      {!lessonId && <S.NoOpenLesson>Выберите урок</S.NoOpenLesson>}
      {lessonId && isError && <ErrorBlock />}
      {lessonId && data && (
        <>
          <S.Title as={'h2'}>
            {data.data.title}
            {!isMobile && (
              <AdminBtn
                popupName="Урок"
                type="edit"
                onClick={() => {}}
                popupHandlers={{
                  onEdit: handleEditLesson,
                  onDelete: data.data.is_deleted ? undefined : handleDeleteLesson,
                  onRestore: data.data.is_deleted ? handleRestoreLesson : undefined,
                }}
              />
            )}
          </S.Title>
          <S.Container>
            <CkEditorOutput data={data.data.description} />
            {data.data.tests.length > 0 && renderLessonTests()}
            {data.data.description.length > 0 &&
              !isFetching &&
              !data.data.isChecked &&
              renderForwardButton()}
          </S.Container>
        </>
      )}
    </>
  );
}
