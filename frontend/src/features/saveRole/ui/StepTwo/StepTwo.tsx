import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { Info } from '../Info';
import * as S from './styles';
import { useEffect, useRef, useState } from 'react';
import { useActions } from '@/shared/lib/hooks/useActions';
import { NEW_ROLE } from '../../model/constants';

export function StepTwo() {
  const { setRoleName, setRoleDescription } = useActions();
  const { roleName, roleDescription, isNew } = useTypedSelector((state) => state.saveRole);
  const roleNameRef = useRef<HTMLInputElement>(null);
  const roleDescriptionRef = useRef<HTMLInputElement>(null);
  const [isValidRoleName, setIsValidRoleName] = useState(true);

  useEffect(() => {
    if (isNew && roleNameRef.current) roleNameRef.current.focus();
    if (!isNew && roleDescriptionRef.current) roleDescriptionRef.current.focus();
  }, [isNew]);

  const handleChangeRoleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNew) return;
    setIsValidRoleName(event.target.value.length > 1);
    setRoleName(event.target.value);
  };

  const handleChangeRoleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleDescription(event.target.value);
  };

  return (
    <>
      <Info text={'Создать новую роль — это ответственное занятие.'} />
      <Info text={'Создавайте аккуратно и только, если это и, '}>
        <span>правда, нужно</span>.
      </Info>
      <S.InputWrapper>
        <S.InputName>Название роли</S.InputName>
        <S.Input
          ref={roleNameRef}
          type="text"
          value={roleName}
          $isValid={isValidRoleName}
          $isChanged={true}
          $isDisabled={!isNew}
          onChange={handleChangeRoleName}
          placeholder={isNew ? NEW_ROLE.name : ''}
        />
        {!isValidRoleName && <S.ErrorText>Название роли должно содержать более двух символов</S.ErrorText>}
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputName>Описание роли</S.InputName>
        <S.Input
          ref={roleDescriptionRef}
          type="text"
          value={roleDescription}
          $isValid={true}
          $isChanged={true}
          onChange={handleChangeRoleDescription}
          placeholder={isNew ? NEW_ROLE.description : ''}
        />
      </S.InputWrapper>
    </>
  );
}
