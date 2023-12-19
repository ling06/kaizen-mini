import { SearchUserInput } from '@/features/usersFilter/ui/SearchUserInput';
import { css } from 'styled-components';
import { UsersList } from './ui/UsersList';
import { User } from '@/entities/user/ui/User';
import { useNavigate } from 'react-router-dom';
import { BigTitle } from '@/shared/ui/components';
import { Layout, WhiteBox } from '@/shared/ui/layouts';
import { useGetUsersQuery, useSearchUsersQuery } from '@/entities/users';
import { LoadingSmall } from '@/components/LoadingSmall';
import { useState } from 'react';

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
  const [searchValue, setSearchValue] = useState('');
  const { data, isError, isLoading } = useGetUsersQuery(null);
  const {
    data: searchData,
    isError: searchError,
    isLoading: searchLoading,
  } = useSearchUsersQuery(searchValue, {
    skip: !searchValue,
  });

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
          onInput={setSearchValue}
          styles={searchInputStyles}
        />
        <UsersList>
          {(isLoading || searchLoading) && <LoadingSmall />}
          {!isError &&
            !isLoading &&
            !searchValue &&
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
          {searchValue &&
            !searchError &&
            !searchLoading &&
            searchData &&
            searchData?.data.length > 0 &&
            searchData?.data.map((user) => {
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
