import { ILesson } from '@/types/lesson.types';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import * as C from '@styles/components';
import { useActions } from '@/hooks/useActions';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDeleteLessonMutation, useRestoreLessonMutation } from '@/store/api/lesson.api';
import { CourseNavItemTitle } from '../CourseNavItemTitle';

interface ICourseNavLessonProps {
  data: ILesson;
}

export function CourseNavLesson({ data }: ICourseNavLessonProps) {
  const [isInit, setInit] = useState<boolean>(true);
  const { setActiveLesson, setLoaderActive } = useActions();
  const navigate = useNavigate();
  const { lessonId, chapterId, courseId } = useParams();
  const [deleteLesson] = useDeleteLessonMutation();
  const [restoreLesson] = useRestoreLessonMutation();
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

  return (
    <S.Container $isDeleted={!!data.is_deleted} onClick={handleClick}>
      <CourseNavItemTitle text={data.title} isActive={!data.isChecked}/>
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
        }}
      />
    </S.Container>
  );
}
