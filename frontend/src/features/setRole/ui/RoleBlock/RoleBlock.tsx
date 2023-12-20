import * as S from './styles';
import { useEffect, useState } from 'react';
import { TRole, useGetRolesQuery } from '@/entities/role';
import { Select } from '../Select';

interface IRoleBlockProps {
  roleId: number;
  onChange: (role: TRole) => void;
}

export function RoleBlock({ roleId, onChange }: IRoleBlockProps) {
  const {data} = useGetRolesQuery(null);
  const [role, setRole] = useState<TRole | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if(!data) return;
    const currentRole = data.data.find(role => role.id === roleId); 
    if(!currentRole) return;
    setRole(currentRole);
  }, [data, roleId])
  const handleSelect = (role: TRole) => {
    setRole(role);
    setIsChanged(true);
    onChange(role);
  }

  return (
    <S.Container>
      <S.Title>Шаблон роли</S.Title>
      {
        data && role && (
          <S.SelectWrapper>
            <Select selectedValue={role} options={data.data} onSelect={handleSelect}/>
            {isChanged && <S.SetBtn>Установить</S.SetBtn>}
          </S.SelectWrapper>
        )
      }
    </S.Container>
  );
}
