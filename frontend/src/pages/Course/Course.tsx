import { CourseNavBody } from '@/components/CourseNavBody';
import * as S from './styles';
import { CourseNavHead } from '@/components/CourseNavHead';
import { useGetCourseByIdQuery } from '@/store/api/course.api';
import { Loading } from '@/components/Loading';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useParams } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { useEffect, useState } from 'react';
import { CourseContent } from '@/components/CourseContent';
import { ICourse } from '@/types/course.types';

export function Course() {
  const { setCourseData, setActiveChapterId } = useActions();
  const { courseId, chapterId, lessonId } = useParams();
  const { data, isError, isLoading } = useGetCourseByIdQuery(Number(courseId));
  const [course, setCourse] = useState<null | ICourse>(null);
  const [activeChapterId, setActiveChapter] = useState<typeof chapterId>(undefined);
  
  useEffect(() => {
    if (data) {
      setCourse(data.data);
      setActiveChapter(chapterId);
    }
 }, [chapterId, data, lessonId]);

 useEffect(() => {
    setCourseData(course);
    setActiveChapterId(activeChapterId);
 }, [course, activeChapterId, setCourseData, setActiveChapterId]);

  return (
    <>
      {isLoading && <Loading />}
      {isError && <ErrorBlock />}
      <S.Container>
        <S.NavContainer>
          <CourseNavHead />
          <CourseNavBody />
        </S.NavContainer>
        <S.ContentContainer>
          <CourseContent />
        </S.ContentContainer>
      </S.Container>
    </>
  );
}


