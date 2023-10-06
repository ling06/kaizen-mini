import { AdminBtn } from '@/components/AdminBtn';
import * as S from './styles';
import * as C from '@styles/components';
import defaultCardImg from '@assets/images/defaultCardImg.png';
import { ADMIN_BTN_TYPES } from '@/constants';

interface ICourseProgrammCard {
  data: any;
}

export function CourseProgrammCard({ data }: ICourseProgrammCard) {
  return (
    <S.Card>
      <S.Img src={defaultCardImg} />
      <S.Title>Как всё устроено?</S.Title>
      <S.ProgressContainer>
        <S.ProgressStatusWrapper>
          <S.ProgressStatus>Пройдено</S.ProgressStatus>
          <AdminBtn type={ADMIN_BTN_TYPES.edit} onClick={() => {}}/>
        </S.ProgressStatusWrapper>
        <C.ProgressBar $progress='50'/>
      </S.ProgressContainer>
    </S.Card>
  );
}
