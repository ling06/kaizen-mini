import { INewsCategory } from '@/types';
import * as S from './styles';

interface INewsCategoryProps {
  data: INewsCategory;
}

export function NewsCategory({ data }:INewsCategoryProps) {
  return (
    <S.Category>
      {data.title}
    </S.Category>
  );
}
