import { IAnswer } from "@/types/lessonTest.types";
import * as S from "./styles";
import { useEffect, useState } from "react";

interface ICheckedAnswer {
  data: IAnswer;
  unspecified?: boolean;
}
export function CheckedAnswer({ data, unspecified }: ICheckedAnswer) {
  const [isUserAnswer, setUserAnswer] = useState<string>("");

  useEffect(() => {
    processingUserResponses();
  }, [data, unspecified]);

  const processingUserResponses = () => {
    if (unspecified) {
      setUserAnswer("Неуказанный");
    } else if (!!data.right_answer) {
      setUserAnswer("Правильно");
    } else {
      setUserAnswer("Неправильно");
    }
  };

  return (
    <S.Container>
      <S.Answer $isRight={isUserAnswer}>{data.answer}</S.Answer>
      <S.Comment $isRight={isUserAnswer}>
        {unspecified
          ? "Это тоже верный ответ, его нужно было указать."
          : data.text}
      </S.Comment>
    </S.Container>
  );
}
