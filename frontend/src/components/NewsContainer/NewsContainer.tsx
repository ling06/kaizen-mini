import { useGetAllNewsQuery } from '@/store/api/news.api';
import { AdminBtn } from '../AdminBtn';
import { NewsEl } from '../NewsEl';
import * as S from './styles';
import { NewsCategoryWrapper } from '../NewsCategoryWrapper';
import { Link } from 'react-router-dom';

export function NewsContainer() {
  const { data, isError, isLoading } = useGetAllNewsQuery();

  return (
    <S.Container>
      <S.Title>
        Новости
        <Link to={'/news/create-news'}>
          <AdminBtn
            popupName="Новость"
            type="add"
            onClick={() => {}}
          />
        </Link>
      </S.Title>
      <S.ContentWrapper>
        <NewsCategoryWrapper />
        <S.News>
          {isError && <div>Ошибка!</div>}
          {isLoading && <div>Загрузка...</div>}
          {data && data.data.length > 0 && data.data.map((newsData) => <NewsEl data={newsData} />)}
        </S.News>
      </S.ContentWrapper>
    </S.Container>
  );
}
