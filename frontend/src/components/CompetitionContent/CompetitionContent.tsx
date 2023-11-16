import { Link, useNavigate, useParams } from 'react-router-dom';
import * as S from './styles';
import { useDeleteCompetitionMutation, useGetCompetitionByIdQuery, useRestoreCompetitionMutation, useUpdateCompetitionMutation } from '@/store/api/competition.api';
import { ContentTitle } from '../ContentTitle';
import { LoadingSmall } from '../LoadingSmall';
import { CkEditorOutput } from '../CkEditorOutput';
import { ErrorBlock } from '../ErrorBlock';
import { NewsRequisites } from '../NewsRequisites';
import { useActions } from '@/hooks/useActions';
import { Content } from '@/layouts/Content';
import { MediaQueries } from '@/constants';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function CompetitionContent() {
  const { setLoaderActive } = useActions();
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const [deleteCompetition] = useDeleteCompetitionMutation();
  const [restoreCompetition] = useRestoreCompetitionMutation();
  const [updateCompetition] = useUpdateCompetitionMutation();
  const { data, isFetching, isError } = useGetCompetitionByIdQuery(Number(competitionId), {
    skip: !competitionId,
  });
  const isMobile = useMediaQuery(MediaQueries.mobile);

  const handleEditCompetition = () => {
    if (!data) {
      console.error('No data:', data);
      return;
    }
    navigate(`/news/competition/edit-competition/${data?.data.id}`);
  };

  const handleDeleteCompetition = () => {
    if (!data) {
      console.error('No data:', data);
      return;
    }
    deleteCompetition({ id: data.data.id }).then(() => {
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  const handleRestoreCompetition = () => {
    if (!data) {
      console.error('No data:', data);
      return;
    }
    restoreCompetition({ id: data.data.id }).then(() => {
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  const handleVisibleCompetition = () => {
    if (!data) {
      console.error('No data:', data);
      return;
    }
    updateCompetition({
      id: data.data.id,
      status: Number(data.data.status) === 0 ? 1 : 0,
    })
      .then((res) => {
        if ('data' in res && !res.data.result) {
          alert('При редактировании конкурса произошла ошибка');
        }
        setLoaderActive(false);
      })
      .catch((err) => {
        console.error(err);
        alert('При редактировании конкурса произошла ошибка');
        setLoaderActive(false);
      });
    setLoaderActive(true);
  };

  return (
    <Content isDeleted={!!data?.data.is_deleted} isVisible={Number(data?.data.status) === 1}>
      {data && !isError && !isFetching && (
        <>
          <ContentTitle title={data?.data.title} />
          <CkEditorOutput data={data.data.text}/>
          <S.BottomContainer>
            <Link to={data.data.link} target='_blank' style={{
              textDecoration: 'none',
              width: isMobile ? '100%' : 'auto',
            }}>
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
              adminHandlers={{
                onDelete: data.data.is_deleted ? undefined : handleDeleteCompetition,
                onRestore: data.data.is_deleted ? handleRestoreCompetition : undefined,
                onEdit: handleEditCompetition,
                onHide: Number(data.data.status) === 1 ? handleVisibleCompetition : undefined,
                onVisible: Number(data.data.status) === 0 ? handleVisibleCompetition : undefined,
              }}
            />
          </S.BottomContainer>
        </>
      )}
      {isFetching && <LoadingSmall />}
      {isError && <ErrorBlock />}
    </Content>
  );
}
