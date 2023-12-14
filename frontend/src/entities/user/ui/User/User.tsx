import { UserAvatar } from '@/shared/ui/components';
import * as S from './styles';
import { RuleSet } from 'styled-components';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';

import { useEffect, useState } from 'react';
import { selectUser } from '../../model/api';
import { User as TUser } from '../..';

interface IUserProps {
  readonly userData: TUser['data'];
  readonly styles?: RuleSet<object>;
  readonly onClick: () => void;
  readonly checkCurrent?: boolean;
}

export function User({ userData, styles, onClick = () => {}, checkCurrent=true }: IUserProps) {
  const userId = useTypedSelector((state) => selectUser(state).data?.data.id);
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
