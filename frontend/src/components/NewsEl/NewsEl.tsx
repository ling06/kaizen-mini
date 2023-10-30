import { Link } from 'react-router-dom';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { INews } from '@/types';

interface INewsElProps {
  data: INews;
}

export function NewsEl({ data }: INewsElProps) {
  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>
      {/* {imgUrl && <S.Image src={imgUrl} />} */}
      <S.Footer>
        <Link
          to={`/news/${data.id}`}
          style={{ display: 'block', marginRight: 'auto' }}>
          <S.MoreBtn>Подробнее</S.MoreBtn>
        </Link>
        <S.Date>{data.date}</S.Date>
        <S.Author>{data.user_id}</S.Author>

        <AdminBtn
          popupName="Новость"
          type="edit"
          onClick={() => {}}
        />
      </S.Footer>
    </S.Container>
  );
}
