import * as S from './styles';

interface ICustomRadioButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  option: string;
  checked: boolean;
}

export function CustomRadioButton({ onChange = () => {}, name = 'default', value, option, checked }: ICustomRadioButtonProps) {
  return (
    <S.Label>
      <S.RadioInput
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
        data-option={option}
        checked={checked}
      />
      <S.CustomRadioInput />
      {value}
    </S.Label>
  );
}
