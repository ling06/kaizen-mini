import { Link } from 'react-router-dom';
import * as S from './styles';
import { INews } from '@/types/news.types';
import { useEffect, useState } from 'react';
import { IEditorJsData } from '@/types/editorJs.types';
import { NewsRequisites } from '../NewsRequisites';

interface INewsElProps {
  data: INews;
}

export function NewsEl({ data }: INewsElProps) {
  const [authorName, setAuthorName] = useState<string | number>('');
  const [imgUrl, setImgUrl] = useState<string | null>('');

  useEffect(() => {
    const name = data.user ? data.user.name : data.user_id;
    setAuthorName(name);
    const editorData: Array<IEditorJsData> = JSON.parse(data.text);
    const firstImageBlock = editorData.find((block) => block.type === 'image');
    if (firstImageBlock && firstImageBlock.data.file?.url) {
      setImgUrl(firstImageBlock.data.file.url);
    } else {
      setImgUrl(null);
    }
  }, [data.text, data.user, data.user_id]);

  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>
      {imgUrl && (
        <S.ImageContainer>
          <S.Image src={imgUrl} />
        </S.ImageContainer>
      )}
      <S.Footer>
        <Link
          to={`/news/${data.id}`}
          style={{ display: 'block', marginRight: 'auto' }}>
          <S.MoreBtn>Подробнее</S.MoreBtn>
        </Link>
        <NewsRequisites
          author={authorName}
          date={data.date}
        />
      </S.Footer>
    </S.Container>
  );
}
