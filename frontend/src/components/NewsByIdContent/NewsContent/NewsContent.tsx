import { useParams } from 'react-router-dom';
import * as S from './styles';
import { useGetNewsByIdQuery } from '@/store/api/news.api';
import { useActions } from '@/hooks/useActions';
import { useEffect, useState } from 'react';
import { IEditorJsData } from '@/types/editorJs.types';
import { useEditorOutput } from '@/hooks/useEditorOutput';
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
  const [editorData, setEditorData] = useState<Array<IEditorJsData>>([]);
  const editorOutput = useEditorOutput(editorData);

  useEffect(() => {
    setLoaderActive(isFetching);
  }, [isFetching, setLoaderActive]);

  useEffect(() => {
    if (data && data.data.text) {
      const editorData: Array<IEditorJsData> = JSON.parse(data.data.text);
      setEditorData(editorData);
    }
  }, [data]);

  return (
    <Content>
      {isError && <ErrorBlock />}
      {data && (
        <>
          <ContentTitle title={data.data.title} />
          <S.EditorOutputContainer>{editorData && editorData.length > 0 && <>{editorOutput}</>}</S.EditorOutputContainer>
          <S.Bottom>
            <NewsRequisites
              author={data.data.user?.name || data.data.user_id}
              date={data.data.date}
            />
          </S.Bottom>
        </>
      )}
    </Content>
  );
}
