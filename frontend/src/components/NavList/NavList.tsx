import * as S from './styles';

interface INavListProps {
  children: React.ReactNode;
}
export function NavList({ children }: INavListProps) {
  return <S.List>{children}</S.List>;
}
