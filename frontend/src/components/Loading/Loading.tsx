import * as S from './styles';
import loadingLogo from '@assets/images/loadingLogo.svg';

export function Loading() {
  return (
    <S.Overlay>
      <S.Container>
          <S.Logo src={loadingLogo}/>
          <S.Text>
            Загрузка...
          </S.Text>
      </S.Container>
    </S.Overlay>
  );
}
