import * as S from './styles';

interface IManagerInfo {
  percentage: string;
  salary: string;
  appSaleValue: string;
  zebrChair: string;
  yamaguchiLvl: string;
}

export function ManagerInfo({ percentage, salary, appSaleValue, zebrChair, yamaguchiLvl }: IManagerInfo) {
  const stars = [1, 2, 3, 4, 5, 6];

  return (
    <S.Container>
      <S.Head>
        <S.PlanText>Твой план выполнен на</S.PlanText>
        <S.PlanСompletionPercentage>{percentage}%</S.PlanСompletionPercentage>
      </S.Head>
      <S.InfoBlock>
        <S.InfoRaw>
          <S.InfoRawTitle>
            Зарплата
          </S.InfoRawTitle>
          <S.InfoRawDots />
          <S.InfoRawValue>
            {salary} ₽
          </S.InfoRawValue>
        </S.InfoRaw>
        <S.InfoRaw>
          <S.InfoRawTitle>
            Через App
          </S.InfoRawTitle>
          <S.InfoRawDots />
          <S.InfoRawValue>
            {appSaleValue}
          </S.InfoRawValue>
        </S.InfoRaw>
        <S.InfoRaw>
          <S.InfoRawTitle>
            Зебр по креслам
          </S.InfoRawTitle>
          <S.InfoRawDots />
          <S.InfoRawValue>
            {zebrChair}
          </S.InfoRawValue>
        </S.InfoRaw>
      </S.InfoBlock>
      <S.Footer>
        <S.YamaguchiLvl>
          <S.YamaguchiLvlTitle>
            Уровень Ямагучести!
          </S.YamaguchiLvlTitle>
          <S.StarsContainer>
            {stars.map((starNumber) => <S.Star $active={starNumber > Number(yamaguchiLvl) ? false : true }/>)}
          </S.StarsContainer>
        </S.YamaguchiLvl>
        <S.MoreLink as={'a'} href={'#'}>
          Подробнее
          <S.MoreIcon />
        </S.MoreLink>
      </S.Footer>
    </S.Container>
  );
}
