import { CourseSelect } from '@/components/CourseSelect';
import * as S from './styles';
import * as C from '@styles/components';
import { CourseMainInfo } from '@/components/CourseMainInfo';
import { CourseProgramm } from '@/components/CourseProgramm';

export function CoursePreview() {
  // const { courseId } = useParams();

  return (
    <C.DefaultContainer>
      <S.Container>
        <CourseSelect />
        <CourseMainInfo />
        <CourseProgramm />
      </S.Container>
    </C.DefaultContainer>
  );
}
