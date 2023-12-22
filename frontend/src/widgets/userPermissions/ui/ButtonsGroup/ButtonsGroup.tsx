import { NoBgButton } from '@/shared/ui/components';
import * as S from './styles';
import { useActions } from '@/shared/lib/hooks/useActions';
import { useUpdateUserPermissionsMutation } from '@/entities/users';
import { useState } from 'react';
import { SaveRole, getPermissions } from '@/features/saveRole';
import { TRole } from '@/entities/role';

interface IButtonsGroupProps {
  formEl: React.MutableRefObject<null>;
  userId: number;
  isOriginal?: boolean;
  role: TRole;
}

export function ButtonsGroup({ formEl, userId, isOriginal=false, role }: IButtonsGroupProps) {
  const { setLoaderActive, setStep, setRoleName, setRoleDescription, setIsRoleNew } = useActions();
  const [updateUserPermissions] = useUpdateUserPermissionsMutation();
  const [isModal, setIsModal] = useState(false);

  const handleUpdatePermissions = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!formEl.current) return;
    const permissions = getPermissions(formEl.current);
    updateUserPermissions({ userId, permissions }).then((res) => {
      setLoaderActive(false);
      if ('error' in res) {
        alert(`Что-то пошло не так: ${res.error}`);
      }
    });
    setLoaderActive(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
    document.body.style.overflow = 'unset';
    document.body.style.paddingRight = 'unset';
  };

  const handleOpenModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsModal(true);
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '16px';
    if(!isOriginal) {
      setStep(2);
      setRoleName(role.name);
      setRoleDescription(role.description);
      setIsRoleNew(false);
    }
  };

  return (
    <S.ButtonsGroup>
      <S.Divider />
      {/* Открывает модальное окно для сохранения новой роли 
      или редактирования существующей */}
      <NoBgButton text={isOriginal ? 'сохранить как роль' : 'изменить роль'} onClick={handleOpenModal}>
        {isOriginal ? <S.SaveIcon /> : <S.EditIcon />}
      </NoBgButton>
      {isModal && <SaveRole onClose={handleCloseModal} formEl={formEl}/>}
      {/* Сохраняет выбранные права */}
      <NoBgButton
        text="сохранить"
        onClick={handleUpdatePermissions}>
        <S.SaveIcon />
      </NoBgButton>
    </S.ButtonsGroup>
  );
}
