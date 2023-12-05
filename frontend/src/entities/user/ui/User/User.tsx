import { UserAvatar } from '@/shared/ui/UserAvatar';
import * as S from './styles';
import { IUser } from '@/shared/types/user.types';
import { RuleSet } from 'styled-components';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { selectUser } from '@/store/api/user.api';
import { useEffect, useState } from 'react';

interface IUserProps {
  userData: IUser;
  styles?: RuleSet<object>;
  onClick: () => void;
  checkCurrent?: boolean;
}

export function User({ userData, styles, onClick = () => {}, checkCurrent=true }: IUserProps) {
  const userId = useTypedSelector((state) => selectUser(state).data?.user.id);
  const [boldName, setBoldName] = useState<boolean>(false);

  useEffect(() => {
    if(!checkCurrent) {
      return;
    }
    const isMe = userData.id === userId;
    setBoldName(isMe);
  }, [checkCurrent, userData.id, userId]);

  return (
    <S.Container
      $styles={styles}
      onClick={onClick}>
      <UserAvatar userData={userData} />
      <S.UserName $bold={boldName}>{userData.name}</S.UserName>
    </S.Container>
  );
}
