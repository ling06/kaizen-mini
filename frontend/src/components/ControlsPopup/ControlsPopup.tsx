import * as S from './styles';

interface IControlsPopup {
  name: string;
  innerRef: React.RefObject<HTMLDivElement>;
  onHide?: (event?: React.MouseEvent) => void;
  onAdd?: (event?: React.MouseEvent) => void;
  onEdit?: (event?: React.MouseEvent) => void;
  onDelete?: (event?: React.MouseEvent) => void;
}

const noop = () => {};

export function ControlsPopup({ innerRef, name, onHide = noop, onAdd = noop, onDelete = noop, onEdit = noop }: IControlsPopup) {
  return (
    <S.Container ref={innerRef}>
      <S.Title>{name}</S.Title>
      <S.HideBtn onClick={onHide}>
        <S.HideIcon />
        скрыть
      </S.HideBtn>
      <S.AddBtn onClick={onAdd}>
        <S.AddIcon />
        добавить
      </S.AddBtn>
      <S.EditBtn onClick={onEdit}>
        <S.EditIcon />
        изменить
      </S.EditBtn>
      <S.DeleteBtn onClick={onDelete}>
        <S.DeleteIcon />
        удалить
      </S.DeleteBtn>
    </S.Container>
  );
}
