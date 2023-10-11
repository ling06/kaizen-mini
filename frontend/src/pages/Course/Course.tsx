import { CourseNavBody } from '@/components/CourseNavBody';
import * as S from './styles';
import { CourseNavHead } from '@/components/CourseNavHead';
import { useGetCourseByIdQuery } from '@/store/api/course.api';
import { Loading } from '@/components/Loading';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useParams } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { useEffect } from 'react';

export function Course() {
  const { setCourseData, setActiveChapterId } = useActions();
  const { courseId, chapterId } = useParams();
  const { data, isError, isLoading } = useGetCourseByIdQuery(Number(courseId));
  
  useEffect(() => {
    if (data) {
      setCourseData(data.data);
      setActiveChapterId(chapterId);
    }
  }, [chapterId, data, setActiveChapterId, setCourseData]);

  return (
    <>
      {isLoading && <Loading />}
      {isError && <ErrorBlock />}
      <S.Container>
        <S.NavContainer>
          <CourseNavHead />
          <CourseNavBody />
        </S.NavContainer>
        <S.ContentContainer></S.ContentContainer>
      </S.Container>
    </>
  );
}
