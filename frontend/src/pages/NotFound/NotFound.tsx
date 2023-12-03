import * as S from "./styles";

export function NotFound() {
  const handleReloadAndGoBack = () => {
    // window.history.back();
    window.location.reload();
  };

  return (
    <S.Container>
      <S.ImgContainer />
      <S.NotFoundText>
        К сожалению, страница не найдена или недоступна.
      </S.NotFoundText>
      <S.BtnUpdate onClick={handleReloadAndGoBack}>Обновить</S.BtnUpdate>
    </S.Container>
  );
}
