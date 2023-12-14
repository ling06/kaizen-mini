import * as S from './styles';
import { AdminBtn } from '../AdminBtn';

interface INoAvailableProps {
  text: string;
  onAdd: () => void;
  style?: { [key: string]: string };
}

export function NoAvailable({ text, onAdd = () => {}, style = {} }: Readonly<INoAvailableProps>) {
  return (
    <S.NoAvailableCourses style={style}>
      <S.NoAvailableCoursesText>{text}</S.NoAvailableCoursesText>
      <AdminBtn
        popupName=""
        onClick={onAdd}
        type="add"
      />
    </S.NoAvailableCourses>
  );
}
