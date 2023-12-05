import { useState } from 'react';
import * as S from './styles';
import { HighLight } from '@/feature/highLightText';

interface ISearchInListInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

const categories = [
  'Категория 1',
  'Категория 2',
  'Категория 3',
  'Категория 4',
]

export function SearchInListInput({ placeholder, onChange }: ISearchInListInputProps) {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  }

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  }

  return (
    <S.Container>
      <S.Inner $active={isActive}>
        <S.InputContainer>
          <S.Input
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            placeholder={placeholder || 'Поиск'}
            value={value}
          />
          <S.SearchIcon />
        </S.InputContainer>
        {isActive && (<S.ResultsList>
          {categories.map((category) => (
            <S.ResultItem key={category}>
              <HighLight filter={value} str={category}/>
            </S.ResultItem>
          ))}
        </S.ResultsList>)}
      </S.Inner>
    </S.Container>
  );
}
