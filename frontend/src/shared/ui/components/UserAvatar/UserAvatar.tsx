import * as S from './styles';
import { useEffect, useState } from 'react';
import { getInitials } from '@/shared/lib/getInitials';
import { User } from '@/entities/user';
import { UserWidget } from '../UserWidget/UserWidget';

interface IProfileProps {
  readonly userData: User['data'];
}

/*
  TODO: Когда будут доступны аватарки пользователей с бэка, добавить UserAvatar
*/

export function UserAvatar({ userData }: IProfileProps) {
  const [initials, setInitials] = useState<null | string>(null);
  const [openWidget, setOpenWidget] = useState(false);

  useEffect(() => {
    if (userData.name) {
      const initials = getInitials(userData.name);
      initials.length > 1 ? setInitials(initials) : setInitials(null);
    }
  }, [userData.name]);

  return (
    // <S.Container $isAvatar={!!userData.avatar} onClick={() => console.log('hi')}>  
    <S.Container $isAvatar={!!userData.avatar} onClick={() => setOpenWidget(true)}>
      {openWidget && <UserWidget/>}
      {userData.avatar ? <S.Avatar src={userData.avatar}/> : <S.Initials>{initials}</S.Initials>}
    </S.Container>
  );
}
