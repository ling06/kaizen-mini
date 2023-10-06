import { AdminBtn } from '../AdminBtn';
import { NewsCategory } from '../NewsCategory';
import { NewsEl } from '../NewsEl';
import * as S from './styles';

export function NewsContainer() {
  return (
    <S.Container>
      <S.Title>
        Новости
        <AdminBtn type='add' onClick={() => {}}/>
      </S.Title>
      <S.ContentWrapper>
        <S.Categories>
          <NewsCategory data={{name: "Категория А"}} />
          <NewsCategory data={{name: "Категория А"}} />
          <NewsCategory data={{name: "Категория А"}} />
          <NewsCategory data={{name: "Категория А"}} />
          <NewsCategory data={{name: "Категория А"}} />
          <NewsCategory data={{name: "Категория А"}} />
        </S.Categories>
        <S.News>
          <NewsEl date={'31.01.2024 16:00'} author={'Юлия Рогачёва'}/>
        </S.News>
      </S.ContentWrapper>
    </S.Container>
  );
}
