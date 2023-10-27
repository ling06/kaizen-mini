import * as S from './styles';

interface IRadioBtnProps {
  onChange?: () => void;
  label: string;
  name: string;
}

export function RadioBtn({ onChange, label, name }: IRadioBtnProps) {
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
      />
      {label}
    </S.Label>
  );
}
