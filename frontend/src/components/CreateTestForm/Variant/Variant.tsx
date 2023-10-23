import { useEffect, useState } from 'react';
import { Title } from '../Title';
import * as S from './styles';
import { DeleteBtn } from '../DeleteBtn';
import { IAnswer } from '@/types/lessonTest.types';
import { CustomRadioButton } from '@/components/CustomRadioButton';
import { useActions } from '@/hooks/useActions';

interface IVariantProps {
  data: IAnswer;
  number: number;
  testId: string;
}

export function Variant({ data, number, testId }: IVariantProps) {
  const { changeAnswerData } = useActions();
  const [variantValue, setVariantValue] = useState<string>(data.answer);
  const [isValid, setValid] = useState<boolean>(false);
  const [isChanged, setChanged] = useState<boolean>(false);
  const [isRightAnswer, setRightAnswer] = useState<boolean>(data.right_answer);

  const handleVariantValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariantValue(event.target.value);
    if (event.target.value.length > 0) {
      setValid(true);
    }
    if (!isChanged) {
      setChanged(true);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleToggleAnswer = (isRight: boolean) => {
    setRightAnswer(isRight);
    const payload = {
      testId,
      answerId: data.id,
      data: {
        right_answer: isRight,
      },
    };
    changeAnswerData(payload);
    console.log(data.right_answer);
  };

  const radioFontStyles = {
    fontSize: '18px',
    fontWeight: '600',
  };

  return (
    <S.Container>
      <Title value={`Вариант ${number}`}>
        <DeleteBtn onClick={() => {}} />
      </Title>
      <S.VariantInput
        type="text"
        value={variantValue}
        onChange={handleVariantValueChange}
        $isChanged={isChanged}
        $isValid={isValid}
      />
      <S.RadioGroup>
        <CustomRadioButton
          styles={{ marginRight: '25px', color: '#5B8930', ...radioFontStyles }}
          name={data.id}
          value="Верный"
          checked={isRightAnswer}
          onChange={() => {
            handleToggleAnswer(true);
          }}
        />
        <CustomRadioButton
          styles={{ color: '#E03638', ...radioFontStyles }}
          name={data.id}
          value="Неверный"
          checked={!isRightAnswer}
          onChange={() => {
            handleToggleAnswer(false);
          }}
        />
      </S.RadioGroup>
    </S.Container>
  );
}
