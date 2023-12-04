import * as S from './styles';

interface ICheckBoxProps {
  label?: string;
  onChange?: () => void;
  children?: React.ReactNode;
  checked?: boolean;
  isRadio?: boolean;
  isLabelBold?: boolean;
}

export function CheckBox({
  label,
  onChange: onChange = () => {},
  children,
  checked = false,
  isRadio = false,
  isLabelBold=true,
}: ICheckBoxProps) {
  return (
    <S.Label>
      <S.Input
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <S.CustomCheckbox
        $checked={checked}
        $isRadio={isRadio}
      />
      {children}
      {label && <S.CheckboxDescr $bold={isLabelBold}>{label}</S.CheckboxDescr>}
    </S.Label>
  );
}
