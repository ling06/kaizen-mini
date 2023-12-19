import * as S from './styles';
import { useEffect, useState } from 'react';
import { TRole, useGetRolesQuery } from '@/entities/role';
import { Select } from '../Select';

interface IRoleBlockProps {
  roleId: number;
}

export function RoleBlock({ roleId }: IRoleBlockProps) {
  const {data} = useGetRolesQuery(null);
  const [role, setRole] = useState<TRole | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if(!data) return;
    const currentRole = data.data.find(role => role.id === roleId); 
    if(!currentRole) return;
    setRole(currentRole);
  }, [data, roleId])
  const handleSelect = (option: TRole) => {
    setRole(option);
    setIsChanged(true);
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
