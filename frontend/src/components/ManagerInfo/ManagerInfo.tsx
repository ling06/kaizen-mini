import { useMediaQuery } from '@mui/material';
import { ProgressInfo } from '../ProgressInfo';
import * as S from './styles';
import { MediaQueries } from '@/constants';

interface IManagerInfo {
  percentage: string;
  salary: string;
  appSaleValue: string;
  zebrChair: string;
  yamaguchiLvl: string;
}

export function ManagerInfo({
  percentage,
  salary,
  appSaleValue,
  zebrChair,
  yamaguchiLvl,
}: IManagerInfo) {
  const stars = [1, 2, 3, 4, 5, 6];
  const isMobile = useMediaQuery(MediaQueries.mobile);

  const progressInfoStyles = {
    marginBottom: isMobile ? '10px' : '30px',
  };

  return (
    <S.Container>
      {percentage && (
        <ProgressInfo
          percentage={percentage}
          text="Твой план выполнен на"
          styles={progressInfoStyles}
        />
      )}
      <S.InfoBlock>
        <S.InfoRaw>
          <S.InfoRawTitle>Зарплата</S.InfoRawTitle>
          <S.InfoRawDots />
          <S.InfoRawValue>{salary} ₽</S.InfoRawValue>
        </S.InfoRaw>
        <S.InfoRaw>
          <S.InfoRawTitle>Через App</S.InfoRawTitle>
          <S.InfoRawDots />
          <S.InfoRawValue>{appSaleValue}</S.InfoRawValue>
        </S.InfoRaw>
        <S.InfoRaw>
          <S.InfoRawTitle>Зебр по креслам</S.InfoRawTitle>
          <S.InfoRawDots />
          <S.InfoRawValue>{zebrChair}</S.InfoRawValue>
        </S.InfoRaw>
      </S.InfoBlock>
      <S.Footer>
        <S.YamaguchiLvl>
          <S.YamaguchiLvlTitle>Уровень Ямагучести!</S.YamaguchiLvlTitle>
          <S.StarsContainer>
            {stars.map((starNumber) => (
              <S.Star $active={starNumber > Number(yamaguchiLvl) ? false : true} />
            ))}
          </S.StarsContainer>
        </S.YamaguchiLvl>
        <S.MoreLink
          as={'a'}
          href={'#'}>
          Подробнее
          <S.MoreIcon />
        </S.MoreLink>
      </S.Footer>
    </S.Container>
  );
}
