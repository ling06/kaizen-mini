import { useState } from 'react';
import { Title } from '../Title';
import * as S from './styles';

interface IVariantProps {
  number: number | string;
}

export function Variant({ number = '',  }: IVariantProps) {
  const [variantValue, setVariantValue] = useState<string>('');

  const handleVariantValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariantValue(event.target.value);
  };
  
  return (
    <S.Container>
      <Title value={`Вариант ${number}`}/> 
      <S.VariantInput type="text" value={variantValue} onChange={handleVariantValueChange}/>
    </S.Container>
  );
}
