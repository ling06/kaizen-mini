import { RuleSet } from 'styled-components';
import * as S from './styles';

interface ITitleProps {
  title: string;
  styles?: RuleSet<object>;
}

export function Title({ title, styles }: ITitleProps) {
  return (
    <S.Title $styles={styles}>
      {title}
    </S.Title>
  );
}
