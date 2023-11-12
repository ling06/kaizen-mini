import { useNavigate, useParams } from 'react-router-dom';
import { BackBtn } from '../BackBtn';
// import * as S from './styles';
import { NavList } from '../NavList';
import { useGetAllCompetitionsQuery, useGetCompetitionByIdQuery } from '@/store/api/competition.api';
import { NavListItem } from '../NavListItem';
import { MediaQueries } from '@/constants';
import { useMediaQuery } from '@mui/material';

export function CompetitionAside() {
  const navigate = useNavigate();
  const {competitionId} = useParams();
  const { data, isError, isFetching } = useGetAllCompetitionsQuery();
  const isMobile = useMediaQuery(MediaQueries.mobile);
  const competitionData = useGetCompetitionByIdQuery(Number(competitionId), {
    skip: !isMobile,
  });

  const handleGoBack = () => {
    navigate('/news');
  };

  const handleGoToCompetition = (id: number) => {
    navigate(`/news/competitions/${id}`);
  }

  return (
    <>
      <BackBtn onClick={handleGoBack} text={isMobile ? competitionData.data?.data.title : undefined}/>
      {!isMobile && data && !isError && !isFetching &&(
        <NavList>
          {data.data.map((competition) => {
            if(Number(competitionId) === competition.id) {
              return null;
            }
            return (
              <NavListItem
                title={competition.title}
                onClick={() => {
                  handleGoToCompetition(competition.id);
                }}
                key={competition.id}
              />
            )
          }
          )}
        </NavList>
      )}
    </>
  );
}
