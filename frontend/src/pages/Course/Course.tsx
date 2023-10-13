import { CourseNavBody } from '@/components/CourseNavBody';
import * as S from './styles';
import { CourseNavHead } from '@/components/CourseNavHead';
import { useGetCourseByIdQuery } from '@/store/api/course.api';
import { Loading } from '@/components/Loading';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useParams } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { useEffect } from 'react';
import { CourseContent } from '@/components/CourseContent';

export function Course() {
  const { setCourseData, setActiveChapterId } = useActions();
  const { courseId, chapterId, lessonId } = useParams();
  const { data, isError, isLoading } = useGetCourseByIdQuery(Number(courseId));
  
  useEffect(() => {
    if (data) {
      setCourseData(data.data);
      setActiveChapterId(chapterId);
    }
  }, [chapterId, data, lessonId, setActiveChapterId, setCourseData]);

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
