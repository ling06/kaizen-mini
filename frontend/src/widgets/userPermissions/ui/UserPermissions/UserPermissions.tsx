import { useGetPermissionsQuery } from '@/entities/permissions';
import { ViewBlock } from '../ViewBlock';
import * as S from './styles';
import { TExtendedUser, useUpdateUserPermissionsMutation } from '@/entities/users';
import { ErrorBlock } from '@/components/ErrorBlock';
import { PermissionsBlock } from '../PermissionsBlock';
import { RoleBlock } from '@/features/setRole';
import { TRole } from '@/entities/role';
import { useState } from 'react';
import { useActions } from '@/shared/lib/hooks/useActions';

interface IUserPermissionsProps {
  userPermissions: TExtendedUser['permissions'] | undefined;
  userRole: TRole | undefined;
  userId: number;
}

export function UserPermissions({
  userPermissions,
  userRole,
  userId,
}: Readonly<IUserPermissionsProps>) {
  const {setLoaderActive} = useActions();
  const [role, setRole] = useState<TRole | null>(userRole || null);
  const { data, isError } = useGetPermissionsQuery(null);
  const [updateUserPermissions] = useUpdateUserPermissionsMutation();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const formData = Object.fromEntries(data.entries());
    const permissions = Object.keys(formData).map((key) => key);
    
    updateUserPermissions({
      userId,
      role_id: role?.id || null,
      permissions: permissions,
    }).then((res) => {
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  const handleRoleChange = (role: TRole) => {
    setRole(role);
  };

  if (!data && isError) {
    return <ErrorBlock />;
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      {role && (
        <RoleBlock
          roleId={role?.id}
          onChange={handleRoleChange}
        />
      )}
      {data && role && (
        <>
          <ViewBlock
            viewPermissions={data.data.view}
            userViewPermissions={role.permissions}
          />
          <PermissionsBlock
            permissions={data.data.create}
            userPermissions={role.permissions}
          />
          <PermissionsBlock
            permissions={data.data.sort}
            userPermissions={role.permissions}
          />
          <PermissionsBlock
            permissions={data.data.edit}
            userPermissions={role.permissions}
          />
          <PermissionsBlock
            permissions={data.data.soft_delete}
            userPermissions={role.permissions}
          />
          <PermissionsBlock
            permissions={data.data.force_delete}
            userPermissions={role.permissions}
          />
          <PermissionsBlock
            permissions={data.data.restore}
            userPermissions={role.permissions}
          />
        </>
      )}
      <button>Сохранить</button>
    </S.Form>
  );
}
