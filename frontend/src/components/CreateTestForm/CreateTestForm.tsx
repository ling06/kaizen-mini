import { useState } from 'react';
import * as S from './styles';
import { Title } from './Title';
import { Variant } from './Variant';
import { IAnswer, ITest } from '@/types/lessonTest.types';
import { useActions } from '@/hooks/useActions';
import { EmptyAnswer } from '@/utils/EmptyAnswer';

interface ICreateTestFormProps {
  data: ITest;
}

export function CreateTestForm({ data }: ICreateTestFormProps) {
  const { changeTestQuestion, addAnswer } = useActions();
  const [isChanged, setChanged] = useState<boolean>(false);
  const [testQuestion, setTestQuestion] = useState<string>(data.question);
  const [variants, setVariants] = useState<Array<IAnswer>>(data.answers);

  const handleChangeTestName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTestQuestion(event.target.value);
    changeTestQuestion({ id: data.id, question: event.target.value });
    if (!isChanged) {
      setChanged(true);
    }
  };

  const handleAddVariant = () => {
    const newVariantsData = [...variants, new EmptyAnswer()];
    addAnswer({id: data.id, data: newVariantsData});
    setVariants(newVariantsData);
  };

  return (
    <S.Container>
      <Title value={'Заголовок теста (необязательно)'} />
      <S.TestName
        type="text"
        value={testQuestion}
        onChange={handleChangeTestName}
        $isValid={true}
        $isChanged={isChanged}
      />
      <S.Variants>
        {variants.length > 0 &&
          variants.map((answer, index) => (
            <Variant
              testId={data.id}
              data={answer}
              number={index + 1}
            />
          ))}
      </S.Variants>
      <S.AddVariant onClick={handleAddVariant}>добавить вариант</S.AddVariant>
    </S.Container>
  );
}
