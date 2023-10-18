import * as S from "./styles";

interface IProgressCounterProps {
  percentage: number;
}

export function ProgressCounter({ percentage }: IProgressCounterProps) {

  const isStart = percentage > 0;

  return (
    <S.ProgressContainer $isStart={isStart}>
      {percentage}%
    </S.ProgressContainer>
  );
}
