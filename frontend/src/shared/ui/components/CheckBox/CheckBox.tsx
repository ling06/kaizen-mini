import * as S from './styles';

interface ICheckBoxProps {
  label?: string;
  onChange?: () => void;
  children?: React.ReactNode;
  checked?: boolean;
  isRadio?: boolean;
  isLabelBold?: boolean;
  name?: string;
}

export function CheckBox({
  label,
  onChange = () => {},
  children,
  checked = false,
  isRadio = false,
  isLabelBold=true,
  name,
}: Readonly<ICheckBoxProps>) {
  return (
    <S.Label> 
      <S.Input
        type="checkbox" 
        onChange={onChange}
        checked={checked}
        name={name ?? ''}
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
