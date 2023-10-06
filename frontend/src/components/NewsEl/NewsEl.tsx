import { AdminBtn } from '../AdminBtn';
import * as S from './styles';

export function NewsEl({ title, imgUrl, newsId, date, author }) {
  return (
    <S.Container>
      <S.Title>
        НОВИНКА! Прибор для профилактики акне и омоложения кожи лица Yamaguchi Plasma Skin Care
      </S.Title>
      {imgUrl && <S.Image src={imgUrl} />}
      <S.Footer>
        <S.MoreBtn>Подробнее</S.MoreBtn>
        <S.Date>
          {date}
        </S.Date>
        <S.Author>
          {author}
        </S.Author>

        <AdminBtn type='edit' onClick={() => {}}/>
      </S.Footer>
    </S.Container>
  );
}
