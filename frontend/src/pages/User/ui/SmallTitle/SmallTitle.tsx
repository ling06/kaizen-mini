import { RuleSet } from 'styled-components';
import * as S from './styles';

interface ISmallTitleProps {
  title: string;
  styles?: RuleSet<object>;
}

export function SmallTitle({ title, styles }: ISmallTitleProps) {
  return (
    <S.SmallTitle $styles={styles}>
      {title}
    </S.SmallTitle>
  );
}
