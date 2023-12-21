import { useGetPermissionsQuery } from '@/entities/permissions';
import { ViewBlock } from '../ViewBlock';
import * as S from './styles';
import { TExtendedUser } from '@/entities/users';
import { ErrorBlock } from '@/components/ErrorBlock';
import { PermissionsBlock } from '../PermissionsBlock';
import { RoleBlock } from '@/features/setRole';
import { TRole } from '@/entities/role';
import { useRef, useState } from 'react';
import { ORIGINAL_ROLE } from '../../model/constants';
import { ButtonsGroup } from '../ButtonsGroup';

interface IUserPermissionsProps {
  userPermissions: TExtendedUser['permissions'] | undefined;
  userRole: TRole | undefined;
  userId: number;
}

export function UserPermissions({ userRole, userId, userPermissions=[] }: Readonly<IUserPermissionsProps>) {
  const [role, setRole] = useState<TRole | null>(userRole ?? {...ORIGINAL_ROLE, permissions: userPermissions});
  const { data, isError } = useGetPermissionsQuery(null);
  const [isOriginal, setIsOriginal] = useState<boolean>(false);
  const formRef = useRef(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleRoleChange = (role: TRole) => {
    setRole(role);
    setIsOriginal(false);
  };

  const handleSetOriginalRole = () => {
    setIsOriginal(true);
  };

  if (!data && isError) {
    return <ErrorBlock />;
  }

  return (
    <S.Form onSubmit={handleSubmit} ref={formRef}>
      <RoleBlock
        userPermissions={userPermissions ?? []}
        userId={userId}
        isOriginal={isOriginal}
        roleId={role?.id}
        onChange={handleRoleChange}
      />
      {data && role && (
        <>
          <ViewBlock
            onChange={handleSetOriginalRole}
            viewPermissions={data.data.view}
            userViewPermissions={role.permissions}
          />
          <PermissionsBlock
            permissions={data.data.create}
            userPermissions={role.permissions}
            onChange={handleSetOriginalRole}
          />
          <PermissionsBlock
            permissions={data.data.sort}
            userPermissions={role.permissions}
            onChange={handleSetOriginalRole}
          />
          <PermissionsBlock
            permissions={data.data.edit}
            userPermissions={role.permissions}
            onChange={handleSetOriginalRole}
          />
          <PermissionsBlock
            permissions={data.data.soft_delete}
            userPermissions={role.permissions}
            onChange={handleSetOriginalRole}
          />
          <PermissionsBlock
            permissions={data.data.force_delete}
            userPermissions={role.permissions}
            onChange={handleSetOriginalRole}
          />
          <PermissionsBlock
            permissions={data.data.restore}
            userPermissions={role.permissions}
            onChange={handleSetOriginalRole}
          />
        </>
      )}
      <ButtonsGroup formEl={formRef} userId={userId}/>
    </S.Form>
  );
}
