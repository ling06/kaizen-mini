import * as S from "./styles";
import { useState } from "react";

export function CounterHeader() {
  const [count, setCount] = useState(0);

  return <S.CounterHeader>{count}</S.CounterHeader>;
}
