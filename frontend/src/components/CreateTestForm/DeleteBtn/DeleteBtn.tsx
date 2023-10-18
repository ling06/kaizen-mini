import * as S from './styles';

interface IDeleteBtnProps {
  onClick: () => void;
  styles?: {
    [key: string]: string;
  };
}
export function DeleteBtn({ onClick = () => {}, styles = {} }: IDeleteBtnProps) {
  return (
    <S.DeleteBtn
      style={styles}
      onClick={onClick}>
      <S.DeleteBtnIcon />
    </S.DeleteBtn>
  );
}
