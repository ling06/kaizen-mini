import * as S from './styles';
import { RuleSet } from 'styled-components';

interface IDndBtn {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  styles?: RuleSet<object>;
}

export function DndBtn({ onClick=()=>{}, onMouseEnter=()=>{}, onMouseLeave=()=>{}, styles }: Readonly<IDndBtn>) {
  return (
    <S.DndBtn
      $style={styles}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
