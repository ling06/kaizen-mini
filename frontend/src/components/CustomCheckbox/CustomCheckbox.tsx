import { useState } from "react";
import * as S from "./styles";

interface ICustomCheckboxProps {
  descr?: string;
  onChange?: () => void;
  children?: React.ReactNode;
  checked?: boolean;
  isRadio?: boolean;
}

export function CustomCheckbox({
  descr,
  onChange: onChange = () => {},
  children,
  checked = false,
  isRadio = false,
}: ICustomCheckboxProps) {
  const [isChecked, setChecked] = useState<boolean>(checked);
  const toggleCheckedStatus = () => {
    setChecked(!isChecked);
  };

  return (
    <S.Label onChange={() => toggleCheckedStatus()}>
      <S.Input type="checkbox" onChange={onChange} checked={isChecked} />
      <S.CustomCheckbox $checked={isChecked} $isRadio={isRadio} />
      {children}
      {descr && <S.CheckboxDescr>{descr}</S.CheckboxDescr>}
    </S.Label>
  );
}
