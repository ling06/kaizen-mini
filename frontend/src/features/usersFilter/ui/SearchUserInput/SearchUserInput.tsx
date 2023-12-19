import { RuleSet } from 'styled-components';
import * as S from './styles';
import { useState } from 'react';

interface ISearchUserInputProps {
  onInput: (value: string) => void;
  placeholder?: string;
  styles?: RuleSet<object>;
}

let timerId: ReturnType<typeof setTimeout>;

export function SearchUserInput({ placeholder, styles, onInput }: Readonly<ISearchUserInputProps>) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    clearTimeout(timerId);
    timerId = setTimeout(() => onInput(e.target.value), 300);
  }

  return (
    <S.Container $styles={styles}>
      <S.SearchInput
        onChange={handleChange}
        type="text"
        placeholder={placeholder ?? 'найти пользователя'}
        value={value}
      />
      <S.SearchIcon />
    </S.Container>
  );
}
