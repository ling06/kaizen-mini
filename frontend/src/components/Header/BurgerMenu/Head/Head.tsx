import { selectUser } from '@/store/api/user.api';
import { BurgerBtn } from '../../BurgerBtn';
import { Profile } from '../../Profile';
import * as S from './styles';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { getUsername } from '@/utils/getUsername';
import { useEffect } from 'react';

interface IHead {
  onClose: () => void;
}
export function Head({ onClose }: IHead) {
  const user = useTypedSelector((state) => selectUser(state).data?.user);
  const username = getUsername(user?.name);

  useEffect(() => {
    console.log('mount');
    setTimeout(() => {
      document.body.addEventListener('click', onClose);
    });

    return () => {
      document.body.removeEventListener('click', onClose);
      console.log('onmount');
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
          <Profile userData={user} />
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
