import { NoBgButton } from '@/shared/ui/components';
import * as S from './styles';
import { useActions } from '@/shared/lib/hooks/useActions';
import { getPermissions } from '../../lib/getPermissions';
import { useUpdateUserPermissionsMutation } from '@/entities/users';
import { TRole } from '@/entities/role';

interface IButtonsGroupProps {
  formEl: React.MutableRefObject<null>;
  userId: number;
  onSave: (role: TRole) => void;
}

export function ButtonsGroup({ formEl, userId, onSave }: IButtonsGroupProps) {
  const {setLoaderActive} = useActions();
  const [updateUserPermissions] = useUpdateUserPermissionsMutation();

  const handleUpdatePermissions = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!formEl.current) return;
    const permissions = getPermissions(formEl.current);
    updateUserPermissions({userId, permissions}).then((res) => {
      setLoaderActive(false); 
      if('data' in res && res.data.data && res.data.data.role) {
        console.log(111);
        onSave(res.data.data.role);
      }
      if('error' in res) {
        alert(`Что-то пошло не так: ${res.error}`);
      }
    });
    setLoaderActive(true);
  }

  return (
    <S.ButtonsGroup>
      <S.Divider />
      {/* Сохраняет набор выбранных прав как роль */}
      <NoBgButton text="сохранить как роль">
        <S.SaveIcon />
      </NoBgButton>
      {/* Сохраняет выбранные права */}
      <NoBgButton text="сохранить" onClick={handleUpdatePermissions}>
        <S.SaveIcon />
      </NoBgButton>
    </S.ButtonsGroup>
  );
}
