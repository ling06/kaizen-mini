import { Layout, WhiteBox } from '@/shared/ui/layouts';
import { Title } from '@/shared/ui/components';
import { css } from 'styled-components';
import { CustomTabs } from '@/features/tabs';
import { nanoid } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '@/entities/users';
import { useMemo } from 'react';
import { UserPermissions } from '@/widgets/userPermissions';
import './styles.css';

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
  const { data, isLoading } = useGetUserQuery(`${userId}`, {
    skip: !userId,
  });

  const panels = useMemo(() => {
    return [
      {
        element: <div>В разработке...</div>,
        id: 'education',
      },
      {
        element: isLoading ? null :(
          <UserPermissions
            userPermissions={data?.data.permissions}
            userRole={data?.data.role}
            userId={data?.data.id}
          />
        ),
        id: 'permissions',
      },
    ];
  }, [data?.data.id, data?.data.permissions, data?.data.role]);

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
