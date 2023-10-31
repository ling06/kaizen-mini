import { useState } from 'react';
import * as S from './styles';
import { Title } from './Title';
import { Variant } from './Variant';
import { ITest } from '@/types/lessonTest.types';
import { useActions } from '@/hooks/useActions';

interface ICreateTestFormProps {
  data: Omit<ITest, 'userTestAnswer'>;
}

export function CreateTestForm({ data }: ICreateTestFormProps) {
  const { changeTestQuestion, addAnswer, deleteTest } = useActions();
  const [isChanged, setChanged] = useState<boolean>(false);

  const handleChangeTestName = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTestQuestion({ id: data.id, question: event.target.value });
    if (!isChanged) {
      setChanged(true);
    }
  };

  const handleAddVariant = () => {
    addAnswer({ id: data.id });
  };

  const handleDeleteTest = () => {
    deleteTest(data.id);
  };

  return (
    <S.Container>
      <Title value={'Заголовок теста (необязательно)'} />
      <S.TestName
        type="text"
        value={data.question}
        onChange={handleChangeTestName}
        $isValid={true}
        $isChanged={isChanged}
      />
      <S.Variants>
        {data.answers.length > 0 &&
          data.answers.map((answer, index) => (
            <Variant
              testId={data.id}
              data={answer}
              number={index + 1}
            />
          ))}
      </S.Variants>
      <S.AddVariant onClick={handleAddVariant}>добавить вариант</S.AddVariant>
      <S.DeleteTestBtn onClick={handleDeleteTest}>
        <S.DeleteTestBtnIcon />
        удалить тест
      </S.DeleteTestBtn>
    </S.Container>
  );
}
