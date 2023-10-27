import * as S from './styles';

interface ICustomRadioButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  option?: string;
  checked?: boolean;
  styles?: {
    [key: string]: string;
  };
  radioStyles?: {
    [key: string]: string;
  };
}

export function CustomRadioButton({
  onChange = () => {},
  name = 'default',
  value,
  option,
  checked,
  styles = {},
  radioStyles={},
}: ICustomRadioButtonProps) {
  return (
    <S.Label style={styles}>
      <S.RadioInput
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
        data-option={option}
        checked={checked}
      />
      <S.CustomRadioInput style={radioStyles}/>
      {value}
    </S.Label>
  );
}
