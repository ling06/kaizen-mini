import * as S from './styles';

interface ITitleProps {
  value: string;
}

export function Title({ value }: ITitleProps) {
  return (
    <S.Title>{value}</S.Title>
  );
}
