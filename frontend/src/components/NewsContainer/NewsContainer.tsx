import { useGetAllNewsQuery } from '@/store/api/news.api';
import { AdminBtn } from '../AdminBtn';
import { NewsCategory } from '../NewsCategory';
import { NewsEl } from '../NewsEl';
import * as S from './styles';

export function NewsContainer() {
  const { data, isError, isLoading } = useGetAllNewsQuery();

  return (
    <S.Container>
      <S.Title>
        Новости
        <AdminBtn
          type="add"
          onClick={() => {}}
        />
      </S.Title>
      <S.ContentWrapper>
        <S.Categories>
          <NewsCategory data={{ name: 'Категория А' }} />
          <NewsCategory data={{ name: 'Категория А' }} />
          <NewsCategory data={{ name: 'Категория А' }} />
          <NewsCategory data={{ name: 'Категория А' }} />
          <NewsCategory data={{ name: 'Категория А' }} />
          <NewsCategory data={{ name: 'Категория А' }} />
        </S.Categories>
        <S.News>
          {isError && <div>Ошибка!</div>}
          {isLoading && <div>Загрузка...</div>}
          {data && data.data.length > 0 && data.data.map((newsData) => <NewsEl data={newsData} />)}
        </S.News>
      </S.ContentWrapper>
    </S.Container>
  );
}
