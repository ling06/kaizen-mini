import * as S from './styles';

interface INewsCategoryProps {
  title: string;
  onClick?: () => void;
}

export function NavListItem({ title, onClick=()=>{} }: INewsCategoryProps) {
  return <S.Item onClick={onClick}>{title}</S.Item>;
}
