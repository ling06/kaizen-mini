import * as S from './styles';
import { NavListItem } from '../NavListItem';
import { useGetNewsCategoryQuery } from '@/store/api/newsCategory.api';
import { useNavigate } from 'react-router-dom';

interface INewsCategoryWrapperProps {
  children?: React.ReactNode;
}

export function NewsCategoryWrapper({ children }: INewsCategoryWrapperProps) {
  const { data, isError, isLoading } = useGetNewsCategoryQuery();
  const navigate = useNavigate();

  const handleGoToCategory = (id: number) => {
    navigate(`/news?category=${id}`);
  };

  const handleGoToAllNews = () => {
    navigate('/news');
  };

  return (
    <S.Wrapper>
      {children}
      {data && data.data.length > 0 && (
        <NavListItem
          title="Все новости"
          onClick={handleGoToAllNews}
        />
      )}
      {isLoading && <div>Загрузка...</div>}
      {isError && <div>Ошибка!</div>}
      {!isError &&
        !isLoading &&
        data &&
        data.data.map((newsCategory) => (
           <NavListItem
            onClick={() => handleGoToCategory(newsCategory.id)}
            title={newsCategory.title}
            key={newsCategory.id}
          />
        ))}
    </S.Wrapper>
  );
}
