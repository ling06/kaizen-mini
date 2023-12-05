import { selectUser } from '@/store/api/user.api';
import { BurgerBtn } from '../../BurgerBtn';
import * as S from './styles';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { getUsername } from '@/shared/lib/getUsername';
import { useEffect } from 'react';
import { UserAvatar } from '@/shared/ui/components';

interface IHead {
  onClose: () => void;
}
export function Head({ onClose }: IHead) {
  const user = useTypedSelector((state) => selectUser(state).data?.user);
  const username = getUsername(user?.name);

  useEffect(() => {
    setTimeout(() => {
      document.body.addEventListener('click', onClose);
    });

    return () => {
      document.body.removeEventListener('click', onClose);
    };
  });

  return (
    <S.Container>
      <BurgerBtn
        isOpen={true}
        onClick={onClose}
      />
      {user && (
        <S.ProfileWrapper>
          <UserAvatar userData={user} />
          {username && (
            <S.UserName>
              <S.Name>{username.firstName}</S.Name>
              <S.Surname>{username.lastName}</S.Surname>
            </S.UserName>
          )}
        </S.ProfileWrapper>
      )}
    </S.Container>
  );
}
