import * as S from "./styles";
import { CounterHeader } from "../CounterHeader/CounterHeader";
import { Profail } from "../Profail/Profail";
import { Search } from "../Search/index";

export function BoxHeaderElements() {
  return (
    <S.BoxHeaderElements>
      <Search />
      <CounterHeader />
      <Profail />
    </S.BoxHeaderElements>
  );
}
