import { useGetRolesQuery } from '@/entities/role';
import { Info } from '../Info';
import * as S from './styles';
import { Role } from '../Role';
import { useActions } from '@/shared/lib/hooks/useActions';
import { NEW_ROLE } from '../../model/constants';

export function StepOne() {
  const { data, isError, isLoading } = useGetRolesQuery(null);
  const { setStep, setRoleName, setRoleDescription, setIsRoleNew, setRoleId } = useActions();

  const handleNextStep = (name: string, descr: string, isNew: boolean = false) => {
    setStep(2);
    setRoleName(isNew ? '' : name);
    setRoleDescription(isNew ? '' : descr);
    setIsRoleNew(isNew);
  };

  return (
    <>
      <Info text={'Сохранить данный набор прав как роль, имеющуюся или новую. '}>
        <span>Пользуйтесь с осторожностью!</span>
      </Info>
      <S.RolesList>
        {data &&
          !isError &&
          !isLoading &&
          data.data.map((role) => {
            return (
              <Role
                key={role.id}
                name={role.name}
                description={role.description}
                onClick={(name, descr) => {
                  handleNextStep(name, descr);
                  setRoleId(role.id);
                }}
              />
            );
          })}
        <Role
          name={NEW_ROLE.name}
          description={NEW_ROLE.description}
          onClick={(name, descr) => {
            handleNextStep(name, descr, true);
            setRoleId(null);
          }}
        />
      </S.RolesList>
    </>
  );
}
