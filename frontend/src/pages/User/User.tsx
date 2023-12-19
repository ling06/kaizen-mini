import { Layout, WhiteBox } from '@/shared/ui/layouts';
import { Title } from '@/shared/ui/components';
import { css } from 'styled-components';
import { CustomTabs } from '@/features/tabs';
import { nanoid } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '@/entities/users';
import { useMemo } from 'react';
import { UserPermissions } from '@/widgets/userPermissions';

const tabs = [
  { name: 'Обучение', queryParam: 'education' },
  { name: 'Права доступа', queryParam: 'permissions' },
].map((tab) => {
  return {
    ...tab,
    id: nanoid(),
  };
});

const layoutStyles = css`
  max-width: 1266px;
  padding-top: 68px;
`;

const titleStyles = css`
  margin-bottom: 25px;
`;
export function User() {
  const { userId } = useParams();
  const { data, isLoading, isError } = useGetUserQuery(`${userId}`, {
    skip: !userId,
  });
  console.log(data?.data);

  const panels = useMemo(() => {
    return [
      {
        element: <div>В разработке...</div>,
        id: 'education',
      },
      {
        element: <UserPermissions userPermissions={data?.data.permissions}/>,
        id: 'permissions',
      },
    ];
  }, [data?.data.permissions]);

  return (
    <Layout styles={layoutStyles}>
      <Title
        title={data?.data.name ?? 'Пользователь'}
        styles={titleStyles}
      />
      <WhiteBox>
        <CustomTabs
          tabNames={tabs}
          tabPanels={panels}
        />
      </WhiteBox>
    </Layout>
  );
}
