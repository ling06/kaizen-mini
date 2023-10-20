import { CourseSelect } from '@/components/CourseSelect';
import * as S from './styles';
import * as C from '@styles/components';
import { CourseMainInfo } from '@/components/CourseMainInfo';
import { CourseProgramm } from '@/components/CourseProgramm';
import { useGetCoursesQuery } from '@/store/api/course.api';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useActions } from '@/hooks/useActions';
import { useEffect } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';

let init = true;

export function CoursePreview() {
  const { data, isError, isFetching } = useGetCoursesQuery();
  const courseId = useTypedSelector(state => state.course.data?.id);
  const { setCourseData, setLoaderActive } = useActions();

  useEffect(() => {
    setLoaderActive(isFetching);
  }, [isFetching, setLoaderActive]);

  useEffect(() => {
    if (data && init) {
      init = false;
      if(courseId) {
        const currentCourse = data.data.find((course) => course.id === Number(courseId));
        if(currentCourse) {
          setCourseData(currentCourse);
          return;
        }
      }
      setCourseData(data.data[0]);
    }
  }, [courseId, data, setCourseData]);

  return (
    <C.DefaultContainer>
      <S.Container>
        {isError && <ErrorBlock />}
        {data && (
          <>
            <CourseSelect />
            <CourseMainInfo />
            <CourseProgramm />
          </>
        )}
      </S.Container>
    </C.DefaultContainer>
  );
}
