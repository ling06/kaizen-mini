import { ITest } from '@/types/lessonTest.types';
import * as S from './styles';
import { RadioBtn } from './RadioBtn';
import { useEffect, useState } from 'react';
import { useSendAnswerMutation } from '@/store/api/lessonTest.api';
import { useActions } from '@/hooks/useActions';
import { CheckedAnswer } from './CheckedAnswer';

interface ILessonTestProps {
  data: ITest;
}

export function LessonTest({ data }: ILessonTestProps) {
  const { setLoaderActive } = useActions();
  const [checkedAnswer, setCheckedAnswer] = useState<null | string>(null);
  const [sendAnswer] = useSendAnswerMutation();
  const [isUserRightAnswer, setIsUserRightAnswer] = useState<boolean>(false);
  const [isTestPassed, setIsTestPassed] = useState<boolean>(false);

  useEffect(() => {
    if (data.userTestAnswer) {
      setIsTestPassed(true);
      setIsUserRightAnswer(!!data.userTestAnswer.is_right);
    }
  }, [data.userTestAnswer]);

  const handleChange = (answer: string): void => {
    setCheckedAnswer(answer);
  };

  const handleSendAnswer = (): void => {
    if (checkedAnswer) {
      sendAnswer({ test_id: data.id, answer: checkedAnswer }).then(() => {
        setCheckedAnswer(null);
      });
      setLoaderActive(true);
    }
  };

  return (
    <S.Container
      $isRight={isUserRightAnswer}
      $isPassed={isTestPassed}>
      <S.Title>{data.question}</S.Title>
      <S.Answers>
        {!data.userTestAnswer &&
          data.answers.map((answer) => (
            <RadioBtn
              name={data.id}
              label={`${answer.answer}`}
              onChange={() => {
                handleChange(`${answer.id}`);
              }}
              key={answer.id}
            />
          ))}
        {data.userTestAnswer &&
          data.answers.map((answer) => {
            if (Number(answer.id) === data.userTestAnswer?.answer) {
              return <CheckedAnswer data={answer} />;
            }
            if (!!answer.right_answer && Number(answer.id) !== data.userTestAnswer?.answer) {
              return <CheckedAnswer data={answer} />;
            }
            return (
              <RadioBtn
                name={data.id}
                label={`${answer.answer}`}
                onChange={() => {}}
                key={answer.id}
                disabled={true}
              />
            );
          })}
      </S.Answers>
      {!data.userTestAnswer && (
        <S.CheckBtn
          onClick={handleSendAnswer}
          disabled={!checkedAnswer}>
          Проверить
        </S.CheckBtn>
      )}
    </S.Container>
  );
}
