import * as S from './styles';

interface ITitleProps {
  value: string;
  children?: React.ReactNode;
}

export function Title({ value, children }: ITitleProps) {
  return (
    <S.Title>
      {value}
      {children}
    </S.Title>
  );
}
