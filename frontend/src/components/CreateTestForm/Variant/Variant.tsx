import { useState } from 'react';
import { Title } from '../Title';
import * as S from './styles';
import { DeleteBtn } from '../DeleteBtn';
import { IAnswer } from '@/types/lessonTest.types';

interface IVariantProps {
  data: IAnswer;
  number: number;
}

export function Variant({ data, number }: IVariantProps) {
  const [variantValue, setVariantValue] = useState<string>(data.answer);
  const [isValid, setValid] = useState<boolean>(false);
  const [isChanged, setChanged] = useState<boolean>(false);

  const handleVariantValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariantValue(event.target.value);
    if (event.target.value.length > 0) {
      setValid(true);
    }
    if (!isChanged) {
      setChanged(true);
    }
  };

  return (
    <S.Container>
      <Title value={`Вариант ${number}`}>
        <DeleteBtn onClick={() => {}}/>
      </Title>
      <S.VariantInput
        type="text"
        value={variantValue}
        onChange={handleVariantValueChange}
        $isChanged={isChanged}
        $isValid={isValid}
      />
    </S.Container>
  );
}
