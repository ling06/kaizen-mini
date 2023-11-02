import { ProgressCounter } from '../ProgressCounter';
import * as S from './styles';

interface ICustomSelectOpionsProps {
  percentage: number;
  status: number;
  title: string;
  isSelected: boolean;
  isDeleted: boolean;
}

export function CustomSelectOption({ percentage, status, title, isSelected, isDeleted }: ICustomSelectOpionsProps) {
  return (
    <S.CustomSelectOption>
      <ProgressCounter percentage={percentage || 0} />
      <S.TextLabel $isSelected={isSelected} $isDeleted={isDeleted}>Курс: {title}</S.TextLabel>
      {status === 0 && <S.IsHiddenIcon />}
    </S.CustomSelectOption>
  );
}
