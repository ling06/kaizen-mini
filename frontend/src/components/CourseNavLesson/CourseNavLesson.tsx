import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import * as C from '@styles/components';

export function CourseNavLesson() {
  return (
    <S.Container>
      <S.LessonName $active={false}>
        Третья буква имени Дмитрия Нагиева
      </S.LessonName>
      <C.DoneIcon />
      <AdminBtn type={'edit'} onClick={()=>{}}/>
    </S.Container>
  );
}
