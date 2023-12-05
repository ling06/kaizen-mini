import { useEffect, useState } from "react";
import * as S from "./styles";
import { Title } from "./Title";
import { Variant } from "./Variant";
import { ITest } from "@/types/lessonTest.types";
import { useActions } from "@/hooks/useActions";
import { CustomRadioButton } from "../CustomRadioButton";

interface ICreateTestFormProps {
  data: Omit<ITest, "userTestAnswer">;
}

export function CreateTestForm({ data }: ICreateTestFormProps) {
  const { changeTestQuestion, addAnswer, deleteTest, resetResponseStatus } =
    useActions();
  const [isChanged, setChanged] = useState<boolean>(false);
  const handleChangeTestName = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTestQuestion({ id: data.id, question: event.target.value });
    if (!isChanged) {
      setChanged(true);
    }
  };
  const [isMultiple, setMultiple] = useState<boolean>(false);

  useEffect(() => {
    let rightAnswers = 0;
    data.answers.forEach((answer) => {
      if (answer.right_answer === "1") {
        rightAnswers += 1;
      }
    });

    if (rightAnswers > 1) {
      setMultiple(true);
    }
  }, [data]);

  const handleAddVariant = () => {
    addAnswer({ id: data.id });
  };

  const handleDeleteTest = () => {
    deleteTest(data.id);
  };

  const toggleStatusMultiple = () => {
    setMultiple(!isMultiple);
  };

  const handleResetResponseStatus = () => {
    if (isMultiple) {
      const testId = data?.id;

      resetResponseStatus({ testId } as any);
    }
  };

  const radioFontStyles = {
    color: "#007AFF",
    fontSize: "18px",
    fontWeight: "500",
  };

  return (
    <S.Container>
      <Title value={"Заголовок теста (необязательно)"} />
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
              quantityOptions={!isMultiple}
            />
          ))}
      </S.Variants>
      <S.AddVariant onClick={handleAddVariant}>добавить вариант</S.AddVariant>
      <S.ContainerBtn>
        <form>
          <CustomRadioButton
            styles={{ ...radioFontStyles }}
            name={"oneOption"}
            value="только один верный ответ"
            checked={!isMultiple}
            onChange={() => {
              toggleStatusMultiple();
              handleResetResponseStatus();
            }}
          />

          <CustomRadioButton
            styles={{ ...radioFontStyles }}
            name={"severalOptions"}
            value="несколько верных ответов"
            checked={isMultiple}
            onChange={() => toggleStatusMultiple()}
          />

          {/* <CustomRadioButton
        styles={{ ...radioFontStyles }}
        name={data.id}
        value="пользовательский вариант ответа"
        checked={false}
        onChange={() => {}}
      /> */}
        </form>
        <S.DeleteTestBtn onClick={handleDeleteTest}>
          <S.DeleteTestBtnIcon />
          удалить тест
        </S.DeleteTestBtn>
      </S.ContainerBtn>
    </S.Container>
  );
}
