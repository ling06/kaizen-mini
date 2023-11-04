import * as S from './styles';

interface IProgressInfoProps {
  text: string;
  percentage: string;
  styles?: {
    [key: string]: string | number;
  };
}

export function ProgressInfo({ text, percentage, styles = {} }: IProgressInfoProps) {
  return (
    <S.Container style={styles}>
      <S.Text>{text}</S.Text>
      <S.Percentage>{percentage}%</S.Percentage>
    </S.Container>
  );
}
