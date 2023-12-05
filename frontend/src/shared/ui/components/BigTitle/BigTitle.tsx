import { ReactNode } from 'react';
import * as S from './styles';
import { RuleSet } from 'styled-components';

interface ITitleProps {
  title: string;
  styles?: RuleSet<object>;
}

export function BigTitle({ title, styles }: ITitleProps): ReactNode {
  return <S.Title $styles={styles}>{title}</S.Title>;
}
