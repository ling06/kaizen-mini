import { useState } from 'react';
import * as S from './styles';
import Select, { SingleValue, components } from 'react-select';

export interface IOption {
  value: string | number;
  label: object | number;
}

interface ICustomSelectProps {
  options: Array<IOption>;
  defaultValue: IOption;
  onChange: (value: SingleValue<IOption>) => void;
}

export function CustomSelect({ options, defaultValue, onChange = () => {} }: ICustomSelectProps) {
  const [selectedOption, setSelectedOption] = useState<(typeof options)[number] | null>(
    defaultValue
  );

  const handleChange = (option: SingleValue<IOption>) => {
    setSelectedOption(option);
    onChange(option);
  };

  const selectStyles = {
    container: (baseStyles: object) => ({
      ...baseStyles,
      backgroundColor: 'transparent',
      width: '50%',
      height: '63px',
      marginRight: 'auto',
      border: '0',
      color: '#000',
      fontSize: '24.923px',
      fontWeight: '700',
      lineHeight: '120%',
      ':focus': {
        boxShadow: 'none',
        border: 'none',
      },
    }),
    control: (baseStyles: object) => ({
      ...baseStyles,
      backgroundColor: 'transparent',
      border: 'none',
      ':hover': {
        border: 'none',
        boxShadow: 'none',
        backgroundColor: '#F1F1F1',
      },
      ':focus': {
        boxShadow: 'transparent',
        border: 'none',
        backgroundColor: '#F1F1F1',
      },
    }),
    menu: (baseStyles: object) => ({
      ...baseStyles,
      padding: '0',
      margin: '3px 0 0',
      backgroundColor: '#fff',
      border: '3px solid #000',
      borderRadius: '15px',
    }),
    indicatorSeparator: (baseStyles: object) => ({
      ...baseStyles,
      backgroundColor: 'transparent',
    }),
  };

  const CustomDropdownIndicator = ({ ...props }) => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <components.DropdownIndicator {...props}>
      <S.dropdownIndicator />
    </components.DropdownIndicator>
  );

  return (
    <Select
      defaultValue={selectedOption}
      onChange={handleChange}
      options={options}
      styles={selectStyles}
      components={{
        DropdownIndicator: CustomDropdownIndicator,
      }}
    />
  );
}
