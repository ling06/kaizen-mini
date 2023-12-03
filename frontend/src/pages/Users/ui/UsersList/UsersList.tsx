import * as S from './styles';

interface IUsersListProps {
  children: React.ReactNode;
}

export function UsersList({ children }: IUsersListProps) {
  return (
    <S.UsersList>
      {children}
    </S.UsersList>
  );
}
