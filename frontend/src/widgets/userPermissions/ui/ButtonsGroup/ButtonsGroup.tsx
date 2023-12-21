import { NoBgButton } from '@/shared/ui/components';
import * as S from './styles';
import { useActions } from '@/shared/lib/hooks/useActions';
import { getPermissions } from '../../lib/getPermissions';
import { useUpdateUserPermissionsMutation } from '@/entities/users';
import { useState } from 'react';
import { SaveRole } from '@/features/saveRole';

interface IButtonsGroupProps {
  formEl: React.MutableRefObject<null>;
  userId: number;
}

export function ButtonsGroup({ formEl, userId }: IButtonsGroupProps) {
  const { setLoaderActive } = useActions();
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
  };

  const handleOpenModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsModal(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <S.ButtonsGroup>
      <S.Divider />
      {/* Открывает модальное окно для сохранения новой роли 
      или редактирования существующей */}
      <NoBgButton text="сохранить как роль" onClick={handleOpenModal}>
        <S.SaveIcon />
      </NoBgButton>
      {isModal && <SaveRole onClose={handleCloseModal} />}
      {/* Сохраняет выбранные права */}
      <NoBgButton
        text="сохранить"
        onClick={handleUpdatePermissions}>
        <S.SaveIcon />
      </NoBgButton>
    </S.ButtonsGroup>
  );
}
