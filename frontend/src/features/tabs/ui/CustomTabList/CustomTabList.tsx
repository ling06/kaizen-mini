import * as S from './styles';

interface ICustomTabListProps {
  children: React.ReactNode;
}

export function CustomTabList({children}: ICustomTabListProps) {
  return (
    <S.Container>
      {children}
      <S.Divider />
    </S.Container>
  );
}
