import * as S from './styles';
import { Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { CustomSelectOption } from '../CustomSelectOption';
import './styles.css';

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
      IconComponent={S.SelectIcon}
      sx={{
        minWidth: '50%',
        marginRight: 'auto',
        border: 0,
        '& fieldset': { border: 'none' },
      }}>
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#f1f1f1 !important',
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#e0e0e0',
            },
            padding: '10px 25px',
          }}>
          <CustomSelectOption
            key={option.value}
            title={`${option.data.title}`}
            percentage={option.data.percentage}
            status={option.data.status}
            isSelected={option.value === value}
          />
        </MenuItem>
      ))}
    </Select>
  );
}
