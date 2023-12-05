import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { selectUser } from '@/store/api/user.api';
import * as S from './styles';
import { UserAvatar } from '@/shared/ui/components';


export function ProfileBlock() {
  const user = useTypedSelector((state) => selectUser(state).data?.user);

  return <S.Container>{user && <UserAvatar userData={user} />}</S.Container>;
}
