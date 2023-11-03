import * as S from './styles';

interface IBurgerBtnProps {
  onClick: () => void;
  isOpen: boolean;
}

export function BurgerBtn({ onClick, isOpen }: IBurgerBtnProps) {
  return <S.Button onClick={onClick}>{isOpen ? <S.CloseIcon /> : <S.OpenIcon />}</S.Button>;
}
