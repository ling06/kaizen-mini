import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectUser } from '@/store/api/user.api';
import * as S from './styles';
import { Profile } from '../Profile';

export function ProfileBlock() {
  const user = useTypedSelector((state) => selectUser(state).data?.user);

  return <S.Container>{user && <Profile userData={user} />}</S.Container>;
}
