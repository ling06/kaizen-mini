import { AdminBtn } from '../AdminBtn';
import { IControlsPopup } from '../ControlsPopup';
import * as S from './styles';

interface INewsRequisitesProps {
  date: string;
  author: string | number;
  adminHandlers?: Omit<IControlsPopup, 'name' | 'innerRef'>;
  onClick?: () => void;
}

export function NewsRequisites({
  date,
  author,
  adminHandlers = {},
  onClick = () => {},
}: INewsRequisitesProps) {
  return (
    <S.Container>
      <S.Date>{date}</S.Date>
      <S.Author>{author}</S.Author>
      <AdminBtn
        popupName="Новость"
        type="edit"
        onClick={onClick}
        popupHandlers={adminHandlers}
      />
    </S.Container>
  );
}
