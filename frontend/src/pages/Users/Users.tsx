import { SearchUserInput } from '@/features/usersFilter/ui/SearchUserInput';
import { css } from 'styled-components';
import { UsersList } from './ui/UsersList';
import { useNavigate } from 'react-router-dom';
import { BigTitle } from '@/shared/ui/components';
import { Layout, WhiteBox } from '@/shared/ui/layouts';
import { User, useGetUsersQuery, useSearchUsersQuery } from '@/entities/users';
import { LoadingSmall } from '@/components/LoadingSmall';
import { useState } from 'react';
import { NoResult } from './ui/NoResult';

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
    isFetching: searchFetching,
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
          {(isLoading || searchLoading || searchFetching) && <LoadingSmall />}
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
            {searchValue && searchData?.data.length === 0 && <NoResult value={searchValue}/>}
        </UsersList>
      </WhiteBox>
    </Layout>
  );
}
