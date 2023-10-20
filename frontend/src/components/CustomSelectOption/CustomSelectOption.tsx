import { ProgressCounter } from '../ProgressCounter';
import * as S from './styles';

interface ICustomSelectOpionsProps {
  percentage: number;
  status: number;
  title: string;
}

export function CustomSelectOption({ percentage, status, title }: ICustomSelectOpionsProps) {
  return (
    <S.CustomSelectOption>
      <ProgressCounter percentage={percentage || 0} />
      <S.TextLabel>Курс: {title}</S.TextLabel>
      {status === 0 && <S.IsHiddenIcon />}
    </S.CustomSelectOption>
  );
}
