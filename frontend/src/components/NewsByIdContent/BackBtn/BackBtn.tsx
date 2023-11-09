import * as S from './styles';

interface IBackBtnProps {
  onClick?: () => void;
  text?: string;
}

export function BackBtn({ onClick = () => {}, text = 'назад' }: IBackBtnProps) {
  return (
    <S.Button onClick={onClick}>
      <S.Icon />
      <S.Text>{text}</S.Text>
    </S.Button>
  );
}
