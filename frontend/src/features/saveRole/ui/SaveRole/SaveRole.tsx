import { useCallback } from 'react';
import * as S from './styles';
import { StepOne } from '../StepOne';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { StepTwo } from '../StepTwo';
import { useActions } from '@/shared/lib/hooks/useActions';
import { getPermissions } from '../..';
import { useCreateRoleMutation, useUpdateRoleMutation } from '@/entities/role';
import { useUpdateUserRoleMutation } from '@/entities/users';

interface ISaveRoleProps {
  onClose: () => void;
  formEl: React.MutableRefObject<null>;
  userId: number;
}

export function SaveRole({ onClose, formEl, userId }: ISaveRoleProps) {
  const { setStep, setLoaderActive } = useActions();
  const { step, roleDescription, roleName, isNew, roleId } = useTypedSelector((state) => state.saveRole);
  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const { setRoleOriginal } = useActions();

  const handleClose = useCallback(() => {
    setStep(1);
    onClose();
  }, [onClose, setStep]);

  const handleClickOverlay = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleSaveRole = () => {
    if (!formEl.current) return;
    const permissions = getPermissions(formEl.current);
    if (isNew) {
      createRole({
        name: roleName,
        description: roleDescription,
        permissions,
      }).then((res) => {
        if ('data' in res && res.data) {
          handleClose();
          updateUserRole({
            userId,
            role_id: res.data.data.id,
          }).then((res) => {
            if ('error' in res) {
              alert(res.error);
            }
            setRoleOriginal(false);
            setLoaderActive(false);
          });
        }

        if ('error' in res) {
          alert(res.error);
          setLoaderActive(false);
        }
      });
      setLoaderActive(true);
    }
    if (!isNew && roleId) {
      updateRole({
        roleId,
        description: roleDescription,
        permissions,
      }).then((res) => {
        handleClose();
        setRoleOriginal(false);
        setLoaderActive(false);
        if ('error' in res) {
          alert(res.error);
        }
        updateUserRole({
          userId,
          role_id: res.data.data.id,
        }).then((res) => {
          if ('error' in res) {
            alert(res.error);
          }
          setRoleOriginal(false);
          setLoaderActive(false);
        });
      });
    }
  };

  return (
    <S.Overlay onClick={handleClickOverlay}>
      <S.Container $step={step}>
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        <S.ButtonsGroup>
          <S.CloseBtn onClick={handleClose}>отмена</S.CloseBtn>
          {step === 2 && (
            <S.SaveBtn onClick={handleSaveRole}>
              <S.SaveIcon />
              сохранить
            </S.SaveBtn>
          )}
        </S.ButtonsGroup>
      </S.Container>
    </S.Overlay>
  );
}
