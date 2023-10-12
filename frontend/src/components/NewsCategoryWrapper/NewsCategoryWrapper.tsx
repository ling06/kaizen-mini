import * as S from './styles';
import { NewsCategory } from '../NewsCategory';
import { useGetNewsCategoryQuery } from '@/store/api/newsCategory.api';

export function NewsCategoryWrapper() {
  const { data, isError, isLoading } = useGetNewsCategoryQuery();
  return (
    <S.Wrapper>
      {isLoading && <div>Загрузка...</div>}
      {isError && <div>Ошибка!</div>}
      {!isError &&
        !isLoading &&
        data &&
        data.data.map((newsCategory) => (
          <NewsCategory
            data={newsCategory}
            key={newsCategory.id}
          />
        ))}
    </S.Wrapper>
  );
}