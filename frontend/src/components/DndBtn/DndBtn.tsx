import * as S from './styles';

interface IDndBtn {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  styles?: { [key: string]: string };
}

export function DndBtn({ onClick=()=>{}, onMouseEnter=()=>{}, onMouseLeave=()=>{}, styles = {} }: IDndBtn) {
  return (
    <S.DndBtn
      style={styles}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
