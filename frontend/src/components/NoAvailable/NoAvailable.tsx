import { useTypedSelector } from '@/shared/hooks/useTypedSelector';
import * as S from './styles';
import { selectUser } from '@/store/api/user.api';
import { AdminBtn } from '../AdminBtn';

interface INoAvailableProps {
  text: string;
  onAdd: () => void;
  style?: { [key: string]: string };
}

export function NoAvailable({ text, onAdd = () => {}, style={} }: INoAvailableProps) {
  const user = useTypedSelector((state) => selectUser(state).data?.user);

  return (
    <S.NoAvailableCourses style={style}>
      <S.NoAvailableCoursesText>{text}</S.NoAvailableCoursesText>
      {user?.role === 'admin' && (
        <AdminBtn
          popupName=""
          onClick={onAdd}
          type="add"
        />
      )}
    </S.NoAvailableCourses>
  );
}
