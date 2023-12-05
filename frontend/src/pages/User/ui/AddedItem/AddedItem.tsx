import * as S from './styles';

interface IAddedItemProps {
  text: string;
  onDelete: () => void;
}

export function AddedItem({ text, onDelete }: IAddedItemProps) {
  return (
    <S.Container>
      <S.Text>{text}</S.Text>
      <S.CloseBtn onClick={onDelete} />
    </S.Container>
  );
}
