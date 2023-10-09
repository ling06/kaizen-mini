import axios from 'axios';
import { CompetitionsSwiper } from '../CompetitionsSwiper';
import { ManagerInfo } from '../ManagerInfo';
import { NewsContainer } from '../NewsContainer';
import * as S from './styles';
import * as C from '@styles/components';

export function NewsMain() {
  axios
    .get('http://kaizen.borboza.com/api/news')
    .then((res) => console.log(res.data));

  return (
    <C.DefaultContainer>
      <S.Container>
        <S.MainInfoWrapper>
          <CompetitionsSwiper />
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
