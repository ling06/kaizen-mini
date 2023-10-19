import { AdminBtn } from "../AdminBtn/AdminBtn";
import { ProgressCounter } from "../ProgressCounter";
import * as S from "./styles";

interface ICustomSelectOpionsProps {
  percentage: number;
  text: string;
}

export function CustomSelectOpions({
  percentage,
  text,
}: ICustomSelectOpionsProps) {
  function handleClickAdminBtn() {
    console.log(3232);
  }
  return (
    <S.CustomSelectOpions>
      <ProgressCounter percentage={percentage} />
      <S.TextLabel>Курс: {text}</S.TextLabel>
      <AdminBtn type={"edit"} onClick={handleClickAdminBtn} />
    </S.CustomSelectOpions>
  );
}
