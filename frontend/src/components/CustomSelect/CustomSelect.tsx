import { useState } from 'react';
import * as S from './styles';
import Select, { SingleValue, components } from 'react-select';

export interface IOption {
  value: string | number;
  label: string | number;
}

interface ICustomSelectProps {
  options: Array<IOption>;
  defaultValue: IOption;
  onChange: (value: SingleValue<IOption>) => void;
}

export function CustomSelect({ options, defaultValue, onChange=()=>{} }: ICustomSelectProps) {
  const [selectedOption, setSelectedOption] = useState<(typeof options)[number] | null>(
    defaultValue
  );

  const handleChange = (option: SingleValue<IOption>) => {
    setSelectedOption(option);
    onChange(option);
  }

  const selectStyles = {
    container: (baseStyles: object) => ({
      ...baseStyles,
      backgroundColor: 'transparent',
      width: '50%',
      marginRight: 'auto',
      border: '0',
      color: '#000',
      fontSize: '24.923px',
      fontWeight: '700',
      lineHeight: '120%',
    }),
    control: (baseStyles: object) => ({
      ...baseStyles,
      backgroundColor: 'transparent',
      border: '0',
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
