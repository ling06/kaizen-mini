import { useCreateNewsMutation } from '@/store/api/news.api';
import { CompetitionsSwiper } from '../CompetitionsSwiper';
import { ManagerInfo } from '../ManagerInfo';
import { NewsContainer } from '../NewsContainer';
import * as S from './styles';
import * as C from '@styles/components';

export function NewsMain() {
  const [createNews] = useCreateNewsMutation();

  const handleClick = () => {
    createNews({
      title: 'test news',
      text: 'text text text text text text text text text text ',
    })
  }

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
        <button onClick={handleClick}>создать новость</button>
        <NewsContainer />
      </S.Container>
    </C.DefaultContainer>
  );
}
