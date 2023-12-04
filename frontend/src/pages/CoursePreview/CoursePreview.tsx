import { CourseSelect } from '@/components/CourseSelect';
import * as S from './styles';
import * as C from '@styles/components';
import { CourseMainInfo } from '@/components/CourseMainInfo';
import { CourseProgramm } from '@/components/CourseProgramm';
import { useGetCoursesQuery } from '@/store/api/course.api';
import { ErrorBlock } from '@/components/ErrorBlock';
import { useActions } from '@/shared/hooks/useActions';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { MediaQueries } from '@/shared/constants';
import { NoAvailable } from '@/components/NoAvailable';

export function CoursePreview() {
  const { data, isError, isFetching } = useGetCoursesQuery();
  const { setCourseData, setLoaderActive, setModalOpen, setModalType } = useActions();
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
      if ((data.data.length > 0 && !currentCourseId) || (data.data.length > 0 && !currentCourse)) {
        navigate(`/courses/${data.data[0].id}`);
        return;
      }
      if (data.data.length === 0) {
        navigate('/courses');
      }
      if (currentCourse) {
        setCourseData(currentCourse);
      }
    }
  }, [data, navigate, params.courseId, setCourseData]);

  const handleCreateCourse = () => {
    setModalOpen(true);
    setModalType('createCourse');
  }

  return (
    <C.DefaultContainer>
      <S.Container>
        {isError && <ErrorBlock />}
        {data && data.data.length > 0 && (
          <>
            {!isMobile && <CourseSelect />}
            <CourseMainInfo coursesData={data.data} />
            <CourseProgramm />
          </>
        )}
        {data && data.data.length === 0 && (
          <NoAvailable text="Нет доступных курсов" onAdd={handleCreateCourse}/>
        )}
      </S.Container>
    </C.DefaultContainer>
  );
}
