import { useGetRolesQuery } from '@/entities/role';
import { SaveRoleInfo } from '../SaveRoleInfo';
import * as S from './styles';
import { Role } from '../Role';

export function SaveRoleStepOne() {
  const { data, isError, isLoading } = useGetRolesQuery(null);
  return (
    <>
      <SaveRoleInfo text={'Сохранить данный набор прав как роль, имеющуюся или новую. '}>
        <span>Пользуйтесь с осторожностью!</span>
      </SaveRoleInfo>
      <S.RolesList>
        {data && !isError && !isLoading && (
          data.data.map((role) => {
            return (
              <Role key={role.id} name={role.name} description={role.description}/>
            );
          })
        )}
        <Role name="Новая" description="Нужно будет придумать название и описание роли"/>
      </S.RolesList>
    </>
  );
}
