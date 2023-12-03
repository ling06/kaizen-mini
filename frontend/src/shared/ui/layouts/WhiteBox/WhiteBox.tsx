import { RuleSet } from 'styled-components';
import * as S from './styles';
import { ReactNode } from 'react';

interface IWhiteBoxProps {
  children: React.ReactNode;
  styles?: RuleSet<object>;
}

export function WhiteBox({ children, styles }: IWhiteBoxProps): ReactNode {
  return <S.WhiteBox $styles={styles}>{children}</S.WhiteBox>;
}
