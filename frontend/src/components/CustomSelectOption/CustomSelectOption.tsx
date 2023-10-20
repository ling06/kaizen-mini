import { ICourse } from '@/types/course.types';
import { ProgressCounter } from '../ProgressCounter';
import * as S from './styles';

interface ICustomSelectOpionsProps {
  data: ICourse;
}

export function CustomSelectOption({ data }: ICustomSelectOpionsProps) {
  return (
    <S.CustomSelectOpions>
      <ProgressCounter percentage={data.percentage?.percentage || 0} />
      <S.TextLabel>Курс: {data.title}</S.TextLabel>
      {data.status === 1 && <S.IsHiddenIcon />}
    </S.CustomSelectOpions>
  );
}
