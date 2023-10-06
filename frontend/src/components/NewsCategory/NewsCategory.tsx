import * as S from './styles';

export function NewsCategory({ data }) {
  return (
    <S.Category>
      {data.name}
    </S.Category>
  );
}
