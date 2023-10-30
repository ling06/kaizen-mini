import { ITest } from '@/types/lessonTest.types';
import * as S from './styles';
import { RadioBtn } from './RadioBtn';
import { useState } from 'react';
import { useSendAnswerMutation } from '@/store/api/lessonTest.api';
import { useActions } from '@/hooks/useActions';

interface ILessonTestProps {
  data: ITest;
}

export function LessonTest({ data }: ILessonTestProps) {
  const { setLoaderActive } = useActions();
  const [checkedAnswer, setCheckedAnswer] = useState<null | string>(null);
  const [sendAnswer] = useSendAnswerMutation();


const handleChange = (answer: string): void => {
  setCheckedAnswer(answer);
}

const handleSendAnswer = (): void => {
  if (checkedAnswer) {
    sendAnswer({ question_id: data.id, answer: checkedAnswer }).then(() => {
      setCheckedAnswer(null);
    });
    setLoaderActive(true);
  }
}

  return (
    <S.Container>
      <S.Title>{data.question}</S.Title>
      <S.Answers>
        {data.answers.map((answer) => (
          <RadioBtn
            name={data.id}
            label={`${answer.answer}`}
            onChange={() => {
              handleChange(`${answer.answer}`);
            }}
            key={answer.id}
          />
        ))}
      </S.Answers>
      <S.CheckBtn onClick={handleSendAnswer} disabled={!checkedAnswer}>
        Проверить
      </S.CheckBtn>
    </S.Container>
  );
}
