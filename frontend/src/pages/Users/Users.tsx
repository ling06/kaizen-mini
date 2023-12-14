import { SearchUserInput } from '@/features/usersFilter/ui/SearchUserInput';
import { css } from 'styled-components';
import { UsersList } from './ui/UsersList';
import { User } from '@/entities/user/ui/User';
import { useNavigate } from 'react-router-dom';
import { BigTitle } from '@/shared/ui/components';
import { Layout, WhiteBox } from '@/shared/ui/layouts';

const users = [
  {
    id: 4533,
    isActive: 1,
    lastAction: '2023-12-03 14:21:24',
    name: 'Александр Короткевич',
    role: 'admin',
    username: 'Korotkevich',
  },
  {
    id: 453,
    isActive: 1,
    lastAction: '2023-12-03 14:21:24',
    name: 'Александр Иванов',
    role: 'admin',
    username: 'Korotkevich',
  },
  {
    id: 43,
    isActive: 1,
    lastAction: '2023-12-03 14:21:24',
    name: 'Александр Смирнов',
    role: 'admin',
    username: 'Korotkevich',
  },
  {
    id: 433,
    isActive: 1,
    lastAction: '2023-12-03 14:21:24',
    name: 'Александр Сидоров',
    role: 'admin',
    username: 'Korotkevich',
  },
  {
    id: 533,
    isActive: 1,
    lastAction: '2023-12-03 14:21:24',
    name: 'Александр Борецкий',
    role: 'admin',
    username: 'Korotkevich',
  },
  {
    id: 33,
    isActive: 1,
    lastAction: '2023-12-03 14:21:24',
    name: 'Александр Короткевич',
    role: 'admin',
    username: 'Korotkevich',
  },
  {
    id: 53,
    isActive: 1,
    lastAction: '2023-12-03 14:21:24',
    name: 'Александр Короткевич',
    role: 'admin',
    username: 'Korotkevich',
  },
];

const layoutStyles = css`
  max-width: 1266px;
  padding-top: 68px;
`;

const titleStyles = css`
  margin-bottom: 25px;
`;

const searchInputStyles = css`
  margin-bottom: 50px;
`;

const userStyles = css`
  width: 33%;
`;

export function Users() {
  const navigate = useNavigate();

  const handleClickUser = (id: number) => {
    navigate(`/users/${id}`);
  };

  return (
    <Layout styles={layoutStyles}>
      <BigTitle
        title="Пользователи"
        styles={titleStyles}
      />
      <WhiteBox>
        <SearchUserInput
          onSearch={(value) => console.log(value)}
          styles={searchInputStyles}
        />
        <UsersList>
          {users.map((user) => {
            return (
              <User
                onClick={() => handleClickUser(user.id)}
                userData={user}
                styles={userStyles}
              />
            );
          })}
        </UsersList>
      </WhiteBox>
    </Layout>
  );
}
