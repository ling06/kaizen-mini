import { useState } from 'react';
import * as S from './styles';
import { SaveRoleStepOne } from '../SaveRoleStepOne';

interface ISaveRoleProps {
  onClose: () => void;
  formEl: React.MutableRefObject<null>;
}

export function SaveRole({ onClose, formEl }: ISaveRoleProps) {
  const [step, setStep] = useState<1 | 2>(1);
  return (
     <S.Overlay onClick={onClose}>
      <S.Container $step={step}>
        {step === 1 && <SaveRoleStepOne />}
      </S.Container>
     </S.Overlay>
  );
}
