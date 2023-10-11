import { AdminBtn } from '@/components/AdminBtn';
import * as S from './styles';
import * as C from '@styles/components';
import defaultCardImg from '@assets/images/defaultCardImg.png';
import { ADMIN_BTN_TYPES } from '@/constants';
import { IChapter } from '@/types/chapter.types';
import { useNavigate } from 'react-router-dom';

interface ICourseProgrammCard {
  data: IChapter;
}

export function CourseProgrammCard({ data }: ICourseProgrammCard) {
  const navigation = useNavigate();

  const handleClick = () => {
    navigation(`/courses/${data.course_id}/${data.id}/`)
  }

  return (
    <S.Card>
      <S.imgWrapper onClick={handleClick}>
        <S.Img src={defaultCardImg} />
      </S.imgWrapper>
      <S.Title>{data.title}</S.Title>
      <S.ProgressContainer>
        <S.ProgressStatusWrapper>
          <S.ProgressStatus>Пройдено</S.ProgressStatus>
          <AdminBtn
            type={ADMIN_BTN_TYPES.edit}
            onClick={() => {}}
          />
        </S.ProgressStatusWrapper>
        <C.ProgressBar $progress="50" />
      </S.ProgressContainer>
    </S.Card>
  );
}
