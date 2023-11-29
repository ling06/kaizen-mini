import { ILesson } from '@/types/lesson.types';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import * as C from '@styles/components';
import { useActions } from '@/hooks/useActions';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDeleteLessonMutation, useRestoreLessonMutation, useUpdateLessonMutation } from '@/store/api/lesson.api';
import { CourseNavItemTitle } from '../CourseNavItemTitle';
import { DndBtn } from '../DndBtn';
import { css } from 'styled-components';

interface ICourseNavLessonProps {
  setDraggable: () => void;
  setNotDraggable: () => void;
  data: ILesson;
}

export function CourseNavLesson({ data, setDraggable, setNotDraggable }: ICourseNavLessonProps) {
  const [isInit, setInit] = useState<boolean>(true);
  const { setActiveLesson, setLoaderActive } = useActions();
  const navigate = useNavigate();
  const { lessonId, chapterId, courseId } = useParams();
  const [deleteLesson] = useDeleteLessonMutation();
  const [restoreLesson] = useRestoreLessonMutation();
  const [updateLesson] = useUpdateLessonMutation();
  const [lessonStatus, setLessonStatus] = useState<number>(0);

  useEffect(() => {
    if(data) {
      setLessonStatus(data.status);
    }
  }, [data])
  const handleClick = () => {
    setActiveLesson(data);
    const lessonPath = generatePath(`/courses/:courseId/:chapterId/:themeId/:lessonId`, {
      courseId: String(courseId),
      chapterId: String(chapterId),
      themeId: String(data.theme_id),
      lessonId: String(data.id),
    });
    navigate(lessonPath);
  };

  useEffect(() => {
    if (isInit && lessonId) {
      if (data.id === Number(lessonId)) {
        setActiveLesson(data);
      }
      setInit(false);
    }
  }, [data, isInit, lessonId, setActiveLesson]);

  const handleEditLesson = () => {
    navigate(
      generatePath(`/courses/:courseId/:chapterId/:themeId/:lessonId/edit-lesson`, {
        courseId: String(courseId),
        chapterId: String(chapterId),
        themeId: String(data.theme_id),
        lessonId: String(data.id),
      })
    );
  };

  const handleDeleteLesson = () => {
    deleteLesson({
      id: Number(data.id),
    });
    setLoaderActive(true);
  };

  const handleRestoreLesson = () => {
    restoreLesson({
      id: Number(data.id),
    });
    setLoaderActive(true);
  };

  const handleToggleLessonStatus = useCallback(() => {
    const newStatus = lessonStatus === 1 ? 0 : 1;
    updateLesson({
      id: Number(data.id),
      status: newStatus,
    }).then((res) => {
      if ('error' in res || "data" in res && !res.data.result) {
        alert("При редактировании урока произошла ошибка");
      }
      // setLoaderActive(false);
    })
    setLoaderActive(true);
  }, [data.id, lessonStatus, setLoaderActive, updateLesson])

  return (
    <S.Container
      $isDeleted={!!data.is_deleted}
      onClick={handleClick}>
      <DndBtn
        onMouseEnter={setDraggable}
        onMouseLeave={setNotDraggable}
        styles={css`
          margin-right: 20px;
        `}
      />
      <CourseNavItemTitle
        text={data.title}
        isActive={!data.isChecked && lessonStatus === 1}
      />
      {data.isChecked && <C.DoneIcon />}
      <AdminBtn
        popupName="Урок"
        styles={{ marginLeft: 'auto' }}
        type={'edit'}
        onClick={() => {}}
        popupHandlers={{
          onEdit: handleEditLesson,
          onDelete: data.is_deleted ? undefined : handleDeleteLesson,
          onRestore: data.is_deleted ? handleRestoreLesson : undefined,
          onHide: lessonStatus > 0 ? handleToggleLessonStatus : undefined,
          onVisible: lessonStatus === 0 ? handleToggleLessonStatus : undefined,
        }}
      />
    </S.Container>
  );
}
