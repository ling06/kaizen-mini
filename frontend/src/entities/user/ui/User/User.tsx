import { UserAvatar } from '@/shared/ui/UserAvatar';
import * as S from './styles';
import { IUser } from '@/types/user.types';
import { RuleSet } from 'styled-components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectUser } from '@/store/api/user.api';
import { useEffect, useState } from 'react';

interface IUserProps {
  userData: IUser;
  styles?: RuleSet<object>;
  onClick: () => void;
}

export function User({ userData, styles, onClick = () => {} }: IUserProps) {
  const userId = useTypedSelector((state) => selectUser(state).data?.user.id);
  const [boldName, setBoldName] = useState<boolean>(false);

  useEffect(() => {
    const isMe = userData.id === userId;
    setBoldName(isMe);
  }, [userData.id, userId]);

  return (
    <S.Container
      $styles={styles}
      onClick={onClick}>
      <UserAvatar userData={userData} />
      <S.UserName $bold={boldName}>{userData.name}</S.UserName>
    </S.Container>
  );
}
