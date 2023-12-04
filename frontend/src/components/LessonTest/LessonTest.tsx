import { ITest } from "@/types/lessonTest.types";
import * as S from "./styles";
import { RadioBtn } from "./RadioBtn";
import { useEffect, useState } from "react";
import { useSendAnswerMutation } from "@/store/api/lessonTest.api";
import { useActions } from "@/hooks/useActions";
import { CheckedAnswer } from "./CheckedAnswer";
import { CustomCheckbox } from "../CustomCheckbox/CustomCheckbox";
interface ILessonTestProps {
  data: ITest;
}

export function LessonTest({ data }: ILessonTestProps) {
  const { setLoaderActive } = useActions();
  const [checkedAnswer, setCheckedAnswer] = useState<null | string>(null);
  const [sendAnswer] = useSendAnswerMutation();
  const [isUserRightAnswer, setIsUserRightAnswer] = useState<string>("");
  const [isTestPassed, setIsTestPassed] = useState<boolean>(false);
  //TODO: сделать типизацию массива
  const [isArrayAnswer, setArrayAnswer] = useState<Array<object>>([]);
  const [isMultiple, setMultiple] = useState<boolean>(false);

  console.log(data);
  

  useEffect(() => {
    let rightAnswers = 0;
    /*TODO: здесь нет смысла в map, можно обычным foreach воспользоваться, либо сделать array.filter, 
    а затем проверить сколько элементов прошли проверку*/
    data.answers.map((answer) => {
      if (answer.right_answer === "1") {
        rightAnswers += 1;
      }
    });
    /*TODO: здесь тоже нет смысла в колбеке внутри setMultiple, просто проверить количество до и в сеттер уже передать булево значение*/
    setMultiple(() => {
      if (rightAnswers > 1) {
        return true;
      }
      return false;
    });
  }, [data]);

  /* TODO: в этом useEffect посмотреть зависимости и обновить массив, если надо*/
  useEffect(() => {
    if (data.userTestAnswer.length > 0) {
      setIsTestPassed(true);
      // setIsUserRightAnswer(!!data.userTestAnswer.is_right);
    }
    if (isMultiple) {
      isArrayAnswer.length === 0
        ? setCheckedAnswer(null)
        : setCheckedAnswer("1");
    }

    handleBorderColor();
  }, [
    data,
    data.userTestAnswer,
    checkedAnswer,
    isArrayAnswer,
    isUserRightAnswer,
  ]);

  //TODO: что с типизацией? Заменить object на конкретный тип
  const handleUserAnswers = (answer: object) => {
    const userAnswers = data.userTestAnswer.find(
      (userAnswer) => Number(userAnswer.answer) === Number(answer.id)
    );
    return userAnswers;
  };

  const handleBorderColor = () => {
    //TODO: какой смысл в some? Если в итоге проверку делаешь сам и возвращаешь значение сам
    data.answers.some((answer) => {
      const userAnswer = handleUserAnswers(answer);

      if (!answer.right_answer && Number(answer.id) === userAnswer?.answer) {
        setIsUserRightAnswer("testFailed");
        return true;
      }

      if (
        !isMultiple &&
        !!answer.right_answer &&
        Number(answer.id) !== userAnswer?.answer
      ) {
        setIsUserRightAnswer("notAllAnswers");
        return true;
      }
    });
  };

  // выполняется при 1 ответе
  const handleChange = (answer: string): void => {
    setCheckedAnswer(answer);
  };

  const handleSendAnswer = (): void => {
    if (checkedAnswer) {
      const ansewer = {
        test_id: data.id,
        answer: checkedAnswer,
      };

      sendAnswer([ansewer]).then(() => {
        setCheckedAnswer(null);
      });
      setLoaderActive(true);
    }
  };

  // выполняется при нескольких ответах
  const handleSeveralAnswers = (answer: string) => {
    const obj = {
      test_id: data.id,
      answer: answer,
    };

    const answerAlreadyExists = isArrayAnswer.some(
      (item) => item.test_id === obj.test_id && item.answer === obj.answer
    );
    if (answerAlreadyExists) {
      setArrayAnswer(
        //TODO: вынести из сеттера, в сеттер передать уже переменную
        isArrayAnswer.filter(
          (item) => item.test_id !== obj.test_id || item.answer !== obj.answer
        )
      );
    } else {
      setArrayAnswer((isArrayAnswer) => {
        return [...isArrayAnswer, obj];
      });
    }
  };

  const handleSendMultipleReplies = () => {
    sendAnswer(isArrayAnswer).then(() => {
      setCheckedAnswer(null);
    });
    setLoaderActive(true);
  };

  const oneCorrectAnswer = () => {
  data.answers.forEach((answer) => {
    const 

    if () {
      return true;
    }
  })
  }

  return (
    <S.Container $isRight={isUserRightAnswer} $isPassed={isTestPassed}>
      <S.Title>{data.question}</S.Title>
      <S.Answers>
        {data.userTestAnswer.length === 0 &&
          data.answers.map((answer) =>
            !isMultiple ? (
              <RadioBtn
                name={data.id}
                label={`${answer.answer}`}
                onChange={() => {
                  handleChange(`${answer.id}`);
                }}
                key={answer.id}
              />
            ) : (
              <CustomCheckbox
                onChange={() => {
                  handleSeveralAnswers(answer.id);
                }}
                children={`${answer.answer}`}
                key={answer.id}
              />
            )
          )}

        {data.userTestAnswer.length > 0 &&
          data.answers.map((answer) => {
            const userAnswer = handleUserAnswers(answer);
            // неверный ответ
            if (
              !answer.right_answer &&
              Number(answer.id) === userAnswer?.answer
            ) {
              return <CheckedAnswer data={answer} />;
            }
            // верный ответ
            if (
              (!!answer.right_answer &&
                Number(answer.id) === userAnswer?.answer) ||
              (!isMultiple && !!answer.right_answer)
            ) {
              return <CheckedAnswer data={answer} />;
            }
            // верный ответ, который не был выбран пользователем
            if (
              isMultiple &&
              !!answer.right_answer &&
              Number(answer.id) !== userAnswer?.answer
            ) {
              return <CheckedAnswer data={answer} unspecified={true} />;
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
      {!!data.userTestAnswer.length || (
        <S.CheckBtn
          onClick={() => {
            if (!isMultiple) {
              handleSendAnswer();
            } else {
              handleSendMultipleReplies();
            }
          }}
          disabled={!checkedAnswer}
        >
          Проверить
        </S.CheckBtn>
      )}
    </S.Container>
  );
}
