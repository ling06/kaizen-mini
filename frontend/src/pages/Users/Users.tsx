import { SearchUserInput } from '@/features/usersFilter/ui/SearchUserInput';
import { css } from 'styled-components';
import { UsersList } from './ui/UsersList';
import { User } from '@/entities/user/ui/User';
import { useNavigate } from 'react-router-dom';
import { BigTitle } from '@/shared/ui/components';
import { Layout, WhiteBox } from '@/shared/ui/layouts';
import { useGetUsersQuery } from '@/entities/users';

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
  const { data, isError, isLoading } = useGetUsersQuery(null);
  console.log(data);

  const handleClickUser = (id: number) => {
    navigate(`/users/${id}`, { relative: 'path' });
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
          {!isError &&
            !isLoading &&
            data?.data.map((user) => {
              return (
                <User
                  onClick={() => handleClickUser(user.id)}
                  userData={user}
                  styles={userStyles}
                  key={user.id}
                />
              );
            })}
        </UsersList>
      </WhiteBox>
    </Layout>
  );
}
