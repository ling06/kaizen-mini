import * as S from './styles';

export interface IControlsPopup {
  name: string;
  innerRef: React.RefObject<HTMLDivElement>;
  onHide?: (event?: React.MouseEvent) => void;
  onAdd?: (event?: React.MouseEvent) => void;
  onEdit?: (event?: React.MouseEvent) => void;
  onDelete?: (event?: React.MouseEvent) => void;
  onRestore?: (event?: React.MouseEvent) => void;
  onVisible?: (event?: React.MouseEvent) => void;
}

export function ControlsPopup({
  innerRef,
  name,
  onHide,
  onAdd,
  onDelete,
  onEdit,
  onRestore,
  onVisible,
}: IControlsPopup) {
  return (
    <S.Overlay>
      <S.Container ref={innerRef}>
        <S.Title>{name}</S.Title>
        {onHide && (
          <S.HideBtn onClick={onHide}>
            <S.HideIcon />
            скрыть
          </S.HideBtn>
        )}
        {onVisible && (
          <S.VisibleBtn onClick={onVisible}>
            <S.VisibleIcon />
            показать
          </S.VisibleBtn>
        )}
        {onAdd && (
          <S.AddBtn onClick={onAdd}>
            <S.AddIcon />
            добавить
          </S.AddBtn>
        )}
        {onEdit && (
          <S.EditBtn onClick={onEdit}>
            <S.EditIcon />
            изменить
          </S.EditBtn>
        )}
        {onDelete && (
          <S.DeleteBtn onClick={onDelete}>
            <S.DeleteIcon />
            удалить
          </S.DeleteBtn>
        )}
        {onRestore && <S.RestoreBtn onClick={onRestore}>восстановить</S.RestoreBtn>}
      </S.Container>
    </S.Overlay>
  );
}
