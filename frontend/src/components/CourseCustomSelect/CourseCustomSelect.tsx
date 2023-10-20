// import * as S from './styles';
import { Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { CustomSelectOption } from '../CustomSelectOption';

interface ICustomSelectOption {
  value: string;
  label: string;
  data: {
    status: number;
    percentage: number;
    title: string;
  };
}

interface ICustomSelectProps {
  options: Array<ICustomSelectOption>;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

export function CourseCustomSelect({ options, value, onChange }: ICustomSelectProps) {
  return (
    <Select
      value={value}
      onChange={onChange}
      sx={{
        width: '50%',
        border: 0,
        marginRight: 'auto',
      }}>
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}>
          <CustomSelectOption
            key={option.value}
            title={`${option.data.title}`}
            percentage={option.data.percentage}
            status={option.data.status}
          />
        </MenuItem>
      ))}
    </Select>
  );
}
