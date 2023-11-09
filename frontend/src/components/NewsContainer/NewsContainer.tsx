import { useGetAllNewsQuery } from '@/store/api/news.api';
import { AdminBtn } from '../AdminBtn';
import { NewsEl } from '../NewsEl';
import * as S from './styles';
import { NewsCategoryWrapper } from '../NewsCategoryWrapper';
import { useNavigate } from 'react-router-dom';
import { ErrorBlock } from '../ErrorBlock';
import { useActions } from '@/hooks/useActions';
import { useEffect } from 'react';

export function NewsContainer() {
  const {setLoaderActive} = useActions();
  const { data, isError, isFetching } = useGetAllNewsQuery();
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
          {isError && <ErrorBlock />}
          {data && data.data.length > 0 && data.data.map((newsData) => <NewsEl data={newsData} />)}
        </S.News>
      </S.ContentWrapper>
    </S.Container>
  );
}
