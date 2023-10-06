import { CourseNavBody } from '@/components/CourseNavBody';
import * as S from './styles';
import { CourseNavHead } from '@/components/CourseNavHead';

export function Course() {
  return (
    <>    
      <S.Container>
        <S.NavContainer>
          <CourseNavHead />
          <CourseNavBody />
        </S.NavContainer>
        <S.ContentContainer></S.ContentContainer>
      </S.Container>
    </>
  );
}
