import { AdminBtn } from '../AdminBtn';
import * as S from './styles';

export function Competition() {
  return (
    <S.Container>
      <S.Head>
        <S.CompetitionPagination>Конкурс 1/7</S.CompetitionPagination>
        <AdminBtn
          type="edit"
          onClick={() => {}}
        />
      </S.Head>
      <S.CompetitionTitle>
        Продай 36 кресел серии X, получи кресло Yamaguchi Osaka в качестве премии
      </S.CompetitionTitle>
      <S.CompetitionDescr>
        Здоровый праздничный ужин вовсе не обязательно должен состоять из шпината, гречки и вареной
        куриной грудки. Самыми лучшими способами приготовления...
      </S.CompetitionDescr>
      <S.MoreBtn onClick={() => {console.log(1111)}}>
        Подробнее
      </S.MoreBtn>
    </S.Container>
  );
}
