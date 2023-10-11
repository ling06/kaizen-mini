import { CourseSelect } from '@/components/CourseSelect';
import * as S from './styles';
import * as C from '@styles/components';
import { CourseMainInfo } from '@/components/CourseMainInfo';
import { CourseProgramm } from '@/components/CourseProgramm';
import { useGetCoursesQuery } from '@/store/api/course.api';
import { Loading } from '@/components/Loading';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useEffect } from 'react';
import { useActions } from '@/hooks/useActions';

let init = true;

export function CoursePreview() {
  const { data, isError, isLoading } = useGetCoursesQuery();
  const { setCourseData } = useActions();

  useEffect(() => {
    if(data && init) {
      setCourseData(data.data[0]);
      init = false;
    }
  }, [data, setCourseData]);

  return (
    <C.DefaultContainer>
      <S.Container>
        {isLoading && <Loading />}
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
