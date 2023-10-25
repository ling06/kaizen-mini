import { useState } from 'react';
import * as S from './styles';

interface CheckboxProps {
  label: string;
}

// Checkbox component
export const Checkbox: React.FC<CheckboxProps> = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    console.log(1111);
  };

  return (
    <S.CheckboxWrapper>
      <S.CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <S.CheckboxLabel>{label}</S.CheckboxLabel>
    </S.CheckboxWrapper>
  );
};

