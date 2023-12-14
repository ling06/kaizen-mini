import { RuleSet } from 'styled-components';
import * as S from './styles';
import { useState } from 'react';

interface ISearchUserInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  styles?: RuleSet<object>;
}

export function SearchUserInput({ placeholder, styles, onSearch }: ISearchUserInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <S.Container $styles={styles}>
      <S.SearchInput
        onChange={handleChange}
        type="text"
        placeholder={placeholder || 'найти пользователя'}
        value={value}
      />
      <S.SearchIcon />
    </S.Container>
  );
}
