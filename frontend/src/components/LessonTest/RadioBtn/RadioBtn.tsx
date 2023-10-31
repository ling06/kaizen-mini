import * as S from './styles';

interface IRadioBtnProps {
  onChange?: () => void;
  label: string;
  name: string;
  disabled?: boolean;
}

export function RadioBtn({ onChange, label, name, disabled=false }: IRadioBtnProps) {
  const handleChange = () => {
    if (onChange) {
      onChange();
    }
  };

  return (
    <S.Label>
      <S.RadioBtn
        type="radio"
        onChange={handleChange}
        name={name}
        disabled={disabled}
      />
      {label}
    </S.Label>
  );
}
