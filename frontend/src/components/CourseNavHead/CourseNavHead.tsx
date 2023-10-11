import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';


export function CourseNavHead() {
  const course = useTypedSelector(state => state.course);
  const chapterData = course.chapters?.find(chapter => chapter.id == Number(course.activeChapterId));

  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title as={'h3'}>{chapterData?.title}</S.Title>
        <AdminBtn
          type={'edit'}
          onClick={() => {}}
        />
      </S.TitleWrapper>
      <S.ProgressBar $progress={'70'} />
    </S.Container>
  );
}
