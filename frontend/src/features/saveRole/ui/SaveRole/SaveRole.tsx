import { useCallback } from 'react';
import * as S from './styles';
import { StepOne } from '../StepOne';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { StepTwo } from '../StepTwo';
import { useActions } from '@/shared/lib/hooks/useActions';
import { getPermissions } from '../..';
import { useCreateRoleMutation } from '@/entities/role';

interface ISaveRoleProps {
  onClose: () => void;
  formEl: React.MutableRefObject<null>;
}

export function SaveRole({ onClose, formEl }: ISaveRoleProps) {
  const { setStep, setLoaderActive } = useActions();
  const { step, roleDescription, roleName, isNew } = useTypedSelector((state) => state.saveRole);
  const [createRole] = useCreateRoleMutation();

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
        setLoaderActive(false);
        if('error' in res) {
          alert(res.error);
        }
      });
      setLoaderActive(true);
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
