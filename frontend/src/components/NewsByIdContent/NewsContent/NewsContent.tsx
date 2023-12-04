import { useNavigate, useParams } from 'react-router-dom';
import * as S from './styles';
import { useDeleteNewsMutation, useGetNewsByIdQuery, useRestoreNewsMutation, useUpdateNewsMutation } from '@/store/api/news.api';
import { useActions } from '@/shared/hooks/useActions';
import { useEffect } from 'react';
import { CkEditorOutput } from '@/components/CkEditorOutput';
import { ErrorBlock } from '@/components/ErrorBlock';
import { NewsRequisites } from '@/components/NewsRequisites';
import { Content } from '@/layouts/Content';
import { ContentTitle } from '@/components/ContentTitle';

export function NewsContent() {
  const { setLoaderActive } = useActions();
  const { newsId } = useParams();
  const { data, isFetching, isError } = useGetNewsByIdQuery(Number(newsId), {
    skip: !newsId,
  });
  const navigate = useNavigate();
  const [deleteNews] = useDeleteNewsMutation();
  const [restoreNews] = useRestoreNewsMutation();
  const [update] = useUpdateNewsMutation();

  useEffect(() => {
    setLoaderActive(isFetching);
  }, [isFetching, setLoaderActive]);

  const handleEditNews = () => {
    if (!data) {
      console.error('no data:' + data);
      return;
    }
    navigate(`/news/edit-news/${data.data.id}`);
  };

  const handleDeleteNews = () => {
    if (!data) {
      console.error('no data:' + data);
      return;
    }
    deleteNews({
      id: data.data.id,
    }).then((res) => {
      if ('data' in res && !res.data.result) {
        alert('При удалении статьи произошла ошибка');
      }
    });
    setLoaderActive(true);
  };

  const handleRestoreNews = () => {
    if (!data) {
      console.error('no data:' + data);
      return;
    }
    restoreNews({
      id: data.data.id,
    }).then((res) => {
      if ('data' in res && !res.data.result) {
        alert('При востановлении статьи произошла ошибка');
      }
    });
    setLoaderActive(true);
  };

  const handleVisibileNews = () => {
    if (!data) {
      console.error('no data:' + data);
      return;
    }
    update({
      id: data.data.id,
      status: Number(data.data.status) === 0 ? 1 : 0,
    });
  };

  return (
    <Content isDeleted={!!data?.data.is_deleted} isVisible={Number(data?.data.status) === 1}>
      {isError && <ErrorBlock />}
      {data && (
        <>
          <ContentTitle title={data.data.title} />
          <CkEditorOutput data={data.data.text} />
          <S.Bottom>
            <NewsRequisites
              author={data.data.user?.name || data.data.user_id}
              date={data.data.date}
              adminHandlers={{
                onEdit: handleEditNews,
                onDelete: data.data.is_deleted ? undefined : handleDeleteNews,
                onRestore: data.data.is_deleted ? handleRestoreNews : undefined,
                onVisible: Number(data.data.status) === 0 ? handleVisibileNews : undefined,
                onHide: Number(data.data.status) === 1 ? handleVisibileNews : undefined,
              }}
            />
          </S.Bottom>
        </>
      )}
    </Content>
  );
}
