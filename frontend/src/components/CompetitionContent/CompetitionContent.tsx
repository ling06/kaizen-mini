import { Link, useParams } from 'react-router-dom';
import * as S from './styles';
import { useGetCompetitionByIdQuery } from '@/store/api/competition.api';
import { ContentTitle } from '../ContentTitle';
import { LoadingSmall } from '../LoadingSmall';
import { ErrorBlock } from '../ErrorBlock';
import { useEditorOutput } from '@/hooks/useEditorOutput';
import { IEditorJsData } from '@/types/editorJs.types';
import { useState, useEffect } from 'react';
import { NewsRequisites } from '../NewsRequisites';

export function CompetitionContent() {
  const { competitionId } = useParams();
  const { data, isFetching, isError } = useGetCompetitionByIdQuery(Number(competitionId), {
    skip: !competitionId,
  });

  const [editorData, setEditorData] = useState<Array<IEditorJsData>>([]);
  const editorOutput = useEditorOutput(editorData);

  useEffect(() => {
    if (data && data.data.text) {
      const editorData: Array<IEditorJsData> = JSON.parse(data.data.text);
      setEditorData(editorData);
    }
  }, [data]);

  return (
    <>
      {data && !isError && !isFetching && (
        <>
          <ContentTitle title={data?.data.title} />
          <S.EditorOutputContainer>{editorOutput}</S.EditorOutputContainer>
          <S.BottomContainer>
            <Link to={data.data.link}>
              {data.data.link && (
                <S.Link>
                  Еще подробнее
                  <S.LinkIcon />
                </S.Link>
              )}
            </Link>
            <NewsRequisites
              date={data.data.date}
              author={data.data.user?.name || data.data.user_id}
            />
          </S.BottomContainer>
        </>
      )}
      {isFetching && <LoadingSmall />}
      {isError && <ErrorBlock />}
    </>
  );
}
