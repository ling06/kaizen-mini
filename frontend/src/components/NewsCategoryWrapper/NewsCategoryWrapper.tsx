import * as S from './styles';
import { NavListItem } from '../NavListItem';
import { useGetNewsCategoryQuery } from '@/store/api/newsCategory.api';

interface INewsCategoryWrapperProps {
  children?: React.ReactNode;
}

export function NewsCategoryWrapper({ children }: INewsCategoryWrapperProps) {
  const { data, isError, isLoading } = useGetNewsCategoryQuery();
  return (
    <S.Wrapper>
      {children}
      {isLoading && <div>Загрузка...</div>}
      {isError && <div>Ошибка!</div>}
      {!isError &&
        !isLoading &&
        data &&
        data.data.map((newsCategory) => (
          <NavListItem
            data={newsCategory}
            key={newsCategory.id}
          />
        ))}
    </S.Wrapper>
  );
}
