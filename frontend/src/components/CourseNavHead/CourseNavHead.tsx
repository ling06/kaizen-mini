import { AdminBtn } from '../AdminBtn';
import * as S from './styles';

export function CourseNavHead() {
  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title as={'h3'}>Чем нам так дорог Дмитрий Нагиев?</S.Title>
        <AdminBtn
          type={'edit'}
          onClick={() => {}}
        />
      </S.TitleWrapper>
      <S.ProgressBar $progress={'70'} />
    </S.Container>
  );
}
