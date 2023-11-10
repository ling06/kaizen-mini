import { useGetAllCompetitionsQuery } from '@/store/api/competition.api';
import { CompetitionsSwiper } from '../CompetitionsSwiper';
import { ManagerInfo } from '../ManagerInfo';
import { NewsContainer } from '../NewsContainer';
import * as S from './styles';
import * as C from '@styles/components';

export function NewsMain() {
  const { data } = useGetAllCompetitionsQuery();

  return (
    <C.DefaultContainer>
      <S.Container>
        <S.MainInfoWrapper>
          {data && <CompetitionsSwiper data={data}/>}
          <ManagerInfo
            percentage={'100'}
            salary={'999999'}
            appSaleValue="999"
            yamaguchiLvl="3"
            zebrChair="2(x) из 33"
          />
        </S.MainInfoWrapper>
        <NewsContainer />
      </S.Container>
    </C.DefaultContainer>
  );
}
