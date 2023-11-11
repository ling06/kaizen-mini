import { useGetAllNewsQuery, useGetNewsByCategoryQuery } from '@/store/api/news.api';
import { AdminBtn } from '../AdminBtn';
import { NewsEl } from '../NewsEl';
import * as S from './styles';
import { NewsCategoryWrapper } from '../NewsCategoryWrapper';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorBlock } from '../ErrorBlock';
import { useActions } from '@/hooks/useActions';
import { useEffect } from 'react';
import { LoadingSmall } from '../LoadingSmall';

export function NewsContainer() {
  const {setLoaderActive} = useActions();
  const [searchParams] = useSearchParams();
  
  const { data, isError, isFetching } = useGetAllNewsQuery(undefined, {
    skip: !!searchParams.get('category'),
  });
  const newsByCategory = useGetNewsByCategoryQuery(Number(searchParams.get('category')), {
    skip: !searchParams.get('category'),
  })
  const navigate = useNavigate();

  useEffect(() => {
    setLoaderActive(isFetching)
  }, [isFetching, setLoaderActive])

  const handleClick = () => {
    navigate('/news/create-news');
  }

  return (
    <S.Container>
      <S.Title>
        Новости
        <AdminBtn
          popupName="Новость"
          type="add"
          onClick={handleClick}
        />
      </S.Title>
      <S.ContentWrapper>
        <NewsCategoryWrapper />
        <S.News>
          {isFetching || newsByCategory.isFetching && (
            <LoadingSmall />
          )}
          {isError && <ErrorBlock />}
          {newsByCategory.data && newsByCategory.data.data.length > 0 && newsByCategory.data.data.map((newsData) => <NewsEl data={newsData} />)}
          {data && data.data.length > 0 && data.data.map((newsData) => <NewsEl data={newsData} />)}
        </S.News>
      </S.ContentWrapper>
    </S.Container>
  );
}
