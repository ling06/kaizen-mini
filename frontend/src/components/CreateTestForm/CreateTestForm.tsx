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
    // TODO: можно поменять на array.filter и проверять length массива
    data.answers.map((answer) => {
      if (answer.right_answer === "1") {
        rightAnswers += 1;
      }
    });
    //TODO: сюда передать уже переменную: boolean;
    setMultiple(() => {
      if (rightAnswers > 1) {
        return true;
      }
      return false;
    });
    // TODO: в этом useEffect посмотреть зависимости и обновить массив, если надо
  }, []);

  const handleAddVariant = () => {
    addAnswer({ id: data.id });
  };

  const handleDeleteTest = () => {
    deleteTest(data.id);
  };

  const toggleStatusMultiple = () => {
    setMultiple(!isMultiple);
  };

  const test1 = () => {
    if (isMultiple) {
      const testId = data.id;
      //TODO: ошибка и типизацией
      resetResponseStatus({ testId });
    }
  };

  const radioFontStyles = {
    color: "#007AFF",
    fontSize: "18px",
    fontWeight: "500",
  };

  //TODO: убрать ненужное
  // const radioFontStylesTest = {
  //   border: "1px solid #red",
  //     backColor: 'red'
  // };

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
        <CustomRadioButton
          styles={{ ...radioFontStyles }}
          name={"oneOption"}
          value="только один верный ответ"
          checked={!isMultiple}
          onChange={() => {
            toggleStatusMultiple();
            test1();
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

        <S.DeleteTestBtn onClick={handleDeleteTest}>
          <S.DeleteTestBtnIcon />
          удалить тест
        </S.DeleteTestBtn>
      </S.ContainerBtn>
    </S.Container>
  );
}
