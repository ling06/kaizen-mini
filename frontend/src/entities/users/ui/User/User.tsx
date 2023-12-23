import { UserAvatar } from '@/shared/ui/components';
import * as S from './styles';
import { RuleSet } from 'styled-components';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';

import { useEffect, useState } from 'react';
import { selectUser } from '../../../auth/api/api';
import { TMeData } from '../../../auth';

interface IUserProps {
  readonly userData: TMeData['data'];
  readonly styles?: RuleSet<object>;
  readonly onClick: () => void;
  readonly checkCurrent?: boolean;
}

export function User({ userData, styles, onClick = () => {}, checkCurrent=true }: IUserProps) {
  const myId = useTypedSelector((state) => selectUser(state).data?.data.id);
  const [boldName, setBoldName] = useState<boolean>(false);

  useEffect(() => {
    if(!checkCurrent) {
      return;
    }
    const isMe = userData.id === myId;
    setBoldName(isMe);
  }, [checkCurrent, userData.id, myId]);

  return (
    <S.Container
      $styles={styles}
      onClick={onClick}>
      <UserAvatar userData={userData} />
      <S.UserName $bold={boldName}>{userData.name}</S.UserName>
    </S.Container>
  );
}
