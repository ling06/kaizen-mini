import * as S from './styles';
import { useEffect, useState } from 'react';
import { TRole, useGetRolesQuery } from '@/entities/role';
import { Select } from '../Select';
import { useUpdateUserRoleMutation } from '@/entities/users';
import { useActions } from '@/shared/lib/hooks/useActions';
import { ORIGINAL_ROLE } from '@/widgets/userPermissions/model/constants';

interface IRoleBlockProps {
  roleId: number | undefined;
  onChange: (role: TRole) => void;
  isOriginal: boolean;
  userId: number;
  userPermissions: TRole['permissions'];
}

export function RoleBlock({
  userPermissions,
  roleId,
  onChange,
  isOriginal = false,
  userId,
}: Readonly<IRoleBlockProps>) {
  const { setLoaderActive } = useActions();
  const { data } = useGetRolesQuery(null);
  const [role, setRole] = useState<TRole>({ ...ORIGINAL_ROLE, permissions: [...userPermissions] });
  const [isChanged, setIsChanged] = useState(false);
  const [updateUserRole] = useUpdateUserRoleMutation();

  useEffect(() => {
    if (!data) return;
    const currentRole = data.data.find((role) => role.id === roleId);
    if (!currentRole) return;
    setRole(currentRole);
  }, [data, roleId]);
  const handleSelect = (role: TRole) => {
    setRole(role);
    setIsChanged(true);
    onChange(role);
  };

  const handleUpdateUserRole = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!role) return;
    updateUserRole({ role_id: role.id, userId }).then((res) => {
      if ('data' in res) {
        onChange(res.data.data.role);
      }
      if ('error' in res) {
        console.log(res.error);
        setIsChanged(true);
      }
      setLoaderActive(false);
    });
    setLoaderActive(true);
    setIsChanged(false);
  };

  return (
    <S.Container>
      <S.Title>Шаблон роли</S.Title>
      {data && role && (
        <S.SelectWrapper>
          <Select
            initialRoleId={roleId}
            selectedValue={isOriginal ? ORIGINAL_ROLE : role}
            options={data.data}
            onSelect={handleSelect}
          />
          {isChanged && !isOriginal && (
            <S.SetBtn onClick={handleUpdateUserRole}>Установить</S.SetBtn>
          )}
        </S.SelectWrapper>
      )}
    </S.Container>
  );
}
