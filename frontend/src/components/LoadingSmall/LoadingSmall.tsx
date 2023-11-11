import * as S from './styles';

export function LoadingSmall() {
  return (
<S.Overlay>
  <S.Container>
    <S.LoadingIcon />
    <S.LoadingText>Загрузка...</S.LoadingText>
  </S.Container>
</S.Overlay>
  );
}