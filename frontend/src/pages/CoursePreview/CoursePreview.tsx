import { CourseSelect } from '@/components/CourseSelect';
import * as S from './styles';
import * as C from '@styles/components';
import { CourseMainInfo } from '@/components/CourseMainInfo';
import { CourseProgramm } from '@/components/CourseProgramm';
import { useGetCoursesQuery } from '@/store/api/course.api';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useActions } from '@/hooks/useActions';
import { useEffect } from 'react';

export function CoursePreview() {
  const { data, isError, isLoading } = useGetCoursesQuery();
  const { setActiveCourseId, setLoaderActive } = useActions();

  useEffect(() => {
    setLoaderActive(isLoading);
  }, [isLoading, setLoaderActive])

  useEffect(() => {
    if (data) {
      setActiveCourseId(data.data[0].id);
    }
  }, [data, setActiveCourseId]);

  return (
    <C.DefaultContainer>
      <S.Container>
        {isError && <ErrorBlock />}
        {data && (
          <>
            <CourseSelect data={data.data} />
            <CourseMainInfo />
            <CourseProgramm />
          </>
        )}
      </S.Container>
    </C.DefaultContainer>
  );
}
