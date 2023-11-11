import * as S from './styles';

interface ICustomCheckboxProps {
  descr?: string;
  onChange?: () => void;
  children?: React.ReactNode;
  checked?: boolean;
  isRadio?: boolean;
}

export function CustomCheckbox({ descr, onChange: onChange = () => {}, children, checked = false, isRadio = false }: ICustomCheckboxProps) {
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
      {descr && <S.CheckboxDescr>{descr}</S.CheckboxDescr>}
    </S.Label>
  );
}
