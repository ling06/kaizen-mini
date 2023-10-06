import * as S from './styles';

interface IDndBtn {
  onClick: () => void;
  styles?: { [key: string]: string };
}

export function DndBtn({ onClick, styles = {} }: IDndBtn) {
  return (
    <S.DndBtn
      style={styles}
      onClick={onClick}
    />
  );
}
