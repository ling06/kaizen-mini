import { useEffect, useState } from 'react';
import * as S from './styles';
import { RuleSet } from 'styled-components';

interface IUncontrolledCheckBoxProps {
  label?: string;
  checked?: boolean;
  name?: string;
  isLabelBold?: boolean;
  styles?: RuleSet<object>;
  onChange?: () => void;
}

export function UncontrolledCheckBox({
  label,
  checked,
  name,
  isLabelBold = true,
  styles,
  onChange=()=>{},
}: Readonly<IUncontrolledCheckBoxProps>) {
  
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsChecked(!!checked);
  }, [checked])
  
  const handleChange = () => {
    setIsChecked(!isChecked); 
    onChange();
  };

  return (
    <S.Label $styles={styles}>
      <S.Input
        type="checkbox"
        onChange={handleChange}
        checked={isChecked}
        name={name ?? ''}
      />
      <S.CustomCheckbox $checked={isChecked} />
      {label && <S.CheckboxDescr $bold={!!isLabelBold}>{label}</S.CheckboxDescr>}
    </S.Label>
  );
}
