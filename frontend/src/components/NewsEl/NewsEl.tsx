import { Link, useNavigate } from 'react-router-dom';
import * as S from './styles';
import { INews } from '@/types/news.types';
import { useEffect, useState } from 'react';
// import { IEditorJsData } from '@/types/editorJs.types';
import { NewsRequisites } from '../NewsRequisites';
import {
  useDeleteNewsMutation,
  useRestoreNewsMutation,
  useUpdateNewsMutation,
} from '@/store/api/news.api';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from "@/hooks/useTypedSelector";

interface INewsElProps {
  data: INews;
}

export function NewsEl({ data }: INewsElProps) {
  const { setLoaderActive } = useActions();
  const [authorName, setAuthorName] = useState<string | number>('');
  const [imgUrl, setImgUrl] = useState<string | null>('');
  const navigate = useNavigate();
  const [deleteNews] = useDeleteNewsMutation();
  const [restoreNews] = useRestoreNewsMutation();
  const [update] = useUpdateNewsMutation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const setCategory = useTypedSelector((state) => state.news.newsCategories);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

  }, []);

  const mobileNavigate = () => {
    if (isMobile) {
      navigate(`/news/${data.id}`, { replace: true });
    }
  };

  const DesNavigateNews = () => {
    if (!isMobile) {
      navigate(`/news/${data.id}`, { replace: true });
    }
  };

  useEffect(() => {
    const name = data.user ? data.user.name : data.user_id;
    setAuthorName(name);
    const ckEditorData = data.text || "";
    // eslint-disable-next-line no-useless-escape
    const regex = /<img.*?src=\"([^\"]*)\".*?>/g;
    const match = regex.exec(ckEditorData);
    const srcValue = match ? match[1] : null;

    setImgUrl(srcValue);
  }, [data.text, data.user, data.user_id]);

  const handleEditNews = () => {
    navigate(`/news/edit-news/${data.id}`);
  };

  const handleDeleteNews = () => {
    deleteNews({
      id: data.id,
    }).then((res) => {
      if ('data' in res && !res.data.result) {
        alert('При удалении статьи произошла ошибка');
      }
    });
    setLoaderActive(true);
  };

  const handleRestoreNews = () => {
    restoreNews({
      id: data.id,
    }).then((res) => {
      if ('data' in res && !res.data.result) {
        alert('При востановлении статьи произошла ошибка');
      }
    });
    setLoaderActive(true);
  };

  const handleVisibileNews = () => {
    update({
      id: data.id,
      NewsCategory: setCategory,
      status: Number(data.status) === 0 ? 1 : 0,
    });
  };

  return (
    <S.Container
      onClick={mobileNavigate}
      $isDeleted={!!data.is_deleted}
      $isVisible={Number(data.status) !== 0}>
      <S.Title>{data.title}</S.Title>
      {imgUrl && (
        <S.ImageContainer>
          <S.Image src={imgUrl} />
        </S.ImageContainer>
      )}
      <S.Footer>
        <S.MoreBtn onClick={DesNavigateNews}>Подробнее</S.MoreBtn>
        <NewsRequisites
          author={authorName}
          date={data.date}
          adminHandlers={{
            onEdit: handleEditNews,
            onDelete: data.is_deleted ? undefined : handleDeleteNews,
            onRestore: data.is_deleted ? handleRestoreNews : undefined,
            onVisible: Number(data.status) === 0 ? handleVisibileNews : undefined,
            onHide: Number(data.status) === 1 ? handleVisibileNews : undefined,
          }}
        />
      </S.Footer>
    </S.Container>
  );
}
