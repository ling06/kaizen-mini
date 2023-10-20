import { ILesson } from '@/types/lesson.types';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import * as C from '@styles/components';
import { useActions } from '@/hooks/useActions';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ICourseNavLessonProps {
  data: ILesson;
}

export function CourseNavLesson({ data }: ICourseNavLessonProps) {
  const [isInit, setInit] = useState<boolean>(true);
  const { setActiveLesson } = useActions();
  const navigate = useNavigate();
  const { lessonId, chapterId, courseId } = useParams();
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
      console.log(data.id, lessonId);

      if (data.id === Number(lessonId)) {
        setActiveLesson(data);
      }
      setInit(false);
    }
  }, [data, isInit, lessonId, setActiveLesson]);

  return (
    <S.Container onClick={handleClick}>
      <S.LessonName $active={!data.isChecked}>{data.title}</S.LessonName>
      {data.isChecked && <C.DoneIcon />}
      <AdminBtn
        styles={{ marginLeft: 'auto' }}
        type={'edit'}
        onClick={() => {}}
      />
    </S.Container>
  );
}
