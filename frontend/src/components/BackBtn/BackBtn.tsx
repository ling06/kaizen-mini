import { useEffect, useState } from "react";
import * as S from "./styles";

interface IBackBtnProps {
  onClick?: () => void;
  text?: string;
}

export function BackBtn({ onClick = () => {}, text }: IBackBtnProps) {
  const [textBtn, setTextBtn] = useState("");

  useEffect(() => {
    if (text !== undefined) {
      setTextBtn(text);
    } else {
      setTextBtn("назад");
    }
  }, [text]);

  return (
    <S.Button onClick={onClick}>
      <S.Icon />
      <S.Text>{textBtn}</S.Text>
    </S.Button>
  );
}
