import { CourseSelect } from '@/components/CourseSelect';
import * as S from './styles';
import * as C from '@styles/components';
import { CourseMainInfo } from '@/components/CourseMainInfo';
import { CourseProgramm } from '@/components/CourseProgramm';
import { useGetCoursesQuery } from '@/store/api/course.api';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useActions } from '@/hooks/useActions';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { MediaQueries } from '@/constants';

export function CoursePreview() {
  const { data, isError, isFetching } = useGetCoursesQuery();
  const { setCourseData, setLoaderActive } = useActions();
  const params = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(MediaQueries.mobile);

  useEffect(() => {
    setLoaderActive(isFetching);
  }, [isFetching, setLoaderActive]);

  useEffect(() => {
    if (data) {
      const currentCourseId = params.courseId || null;
      const currentCourse = data.data.find((course) => course.id === Number(currentCourseId));
      if (data.data.length > 0 && !currentCourseId || !currentCourse) {
        navigate(`/courses/${data.data[0].id}`);
        return;
      }
      if(data.data.length === 0) {
        navigate('/courses');
      }

      setCourseData(currentCourse);
    }
  }, [data, navigate, params.courseId, setCourseData]);

  return (
    <C.DefaultContainer>
      <S.Container>
        {isError && <ErrorBlock />}
        {data && (
          <>
            {!isMobile && <CourseSelect />}
            <CourseMainInfo coursesData={data.data}/>
            <CourseProgramm />
          </>
        )}
      </S.Container>
    </C.DefaultContainer>
  );
}
