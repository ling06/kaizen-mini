import { IUser } from '@/types/user.types';
import * as S from './styles';
import { useEffect, useState } from 'react';
import { getInitials } from '@/utils/getInitials';

interface IProfileProps {
  userData: IUser;
}

/*
  TODO: Когда будут доступны аватарки пользователей с бэка, добавить UserAvatar
*/

export function Profile({ userData }: IProfileProps) {
  const [initials, setInitials] = useState<null | string>(null);

  useEffect(() => {
    if (userData.name) {
      const initials = getInitials(userData.name);
      initials.length > 1 ? setInitials(initials) : setInitials(null);
    }
  }, [userData.name]);

  return (
    <S.Container>
      <S.InitialsWrapper>
        <S.Initials>{initials}</S.Initials>
      </S.InitialsWrapper>
    </S.Container>
  );
}
