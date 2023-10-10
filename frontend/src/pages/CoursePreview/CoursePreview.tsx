import { CourseSelect } from '@/components/CourseSelect';
import * as S from './styles';
import * as C from '@styles/components';
import { CourseMainInfo } from '@/components/CourseMainInfo';
import { CourseProgramm } from '@/components/CourseProgramm';
import { useGetCoursesQuery } from '@/store/api/course.api';

export function CoursePreview() {
  const { data, isError, isLoading } = useGetCoursesQuery();

  console.log(data);

  return (
    <C.DefaultContainer>
      <S.Container>
        {isLoading && <div>Загрузка...</div>}
        {isError && <div>Ошибка!</div>}
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
