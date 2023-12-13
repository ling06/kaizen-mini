import * as S from './styles';

interface ICustomTabProps {
  isActive: boolean;
  name: string;
}

export function CustomTab({ isActive, name }: ICustomTabProps) {
  return (
    <S.Tab $isActive={isActive}>
      {name}
      <S.UnderLine $isActive={isActive} />
    </S.Tab>
  );
}
