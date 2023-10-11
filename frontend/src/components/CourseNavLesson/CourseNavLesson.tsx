import { ILesson } from '@/types/lesson.types';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import * as C from '@styles/components';

interface ICourseNavLessonProps {
  data: ILesson;
}

export function CourseNavLesson({ data }: ICourseNavLessonProps) {
  return (
    <S.Container>
      <S.LessonName $active={false}>{data.title}</S.LessonName>
      <C.DoneIcon />
      <AdminBtn
        type={'edit'}
        onClick={() => {}}
      />
    </S.Container>
  );
}
