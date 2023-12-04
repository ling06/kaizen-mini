import { useCheckLessonMutation } from '@/store/api/lesson.api';
import { useActions } from './useActions';
import { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

interface IUseCheckLessonProps {
  courseId: string;
  lessonId: string;
}

export const useCheckLesson = ({ courseId, lessonId }: IUseCheckLessonProps) => {
  const { setLoaderActive } = useActions();
  const [checkLesson] = useCheckLessonMutation();
  const navigate = useNavigate();

  const handleError = () => {
    alert(`Не указан ID курса или урока: courseId - ${courseId}, lessonId - ${lessonId}`);
  }

  const handleCheckLesson = useCallback(() => {
    checkLesson({
      id: lessonId,
    }).then((res) => {
      // setLoaderActive(false);

      if ('error' in res || ('data' in res && !res.data.result)) {
        alert('При прохождении урока произошла ошибка!');
        return;
      }

      const nextLesson = res.data.next_lesson;
      const path = generatePath(`/courses/:courseId/:chapterId?/:themeId?/:lessonId?`, {
        courseId: String(courseId),
        chapterId: nextLesson.chapter !== 'end' ? String(nextLesson.chapter) : null,
        themeId: nextLesson.theme !== 'end' ? String(nextLesson.theme) : null,
        lessonId: nextLesson.lesson !== 'end' ? String(nextLesson.lesson) : null,
      });

      navigate(path);
    });
    setLoaderActive(true);
  }, [checkLesson, courseId, lessonId, navigate, setLoaderActive]);

  if (!courseId || !lessonId) {
    return [handleError];
  }

  return [handleCheckLesson];
};
