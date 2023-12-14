import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import * as S from './styles';
import { UserAvatar } from '@/shared/ui/components';
import { selectUser } from '@/entities/user';


export function ProfileBlock() {
  const user = useTypedSelector((state) => selectUser(state).data?.data);
  console.log('user', user);
  

  return <S.Container>{user && <UserAvatar userData={user} />}</S.Container>;
}
