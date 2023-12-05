import { INewsCategory } from '@/shared/model/types/news.types';
import * as S from './styles';
import { useEffect, useRef, useState } from 'react';
import { CustomCheckbox } from '@/components/CustomCheckbox';

interface ICategoryProps {
  data: INewsCategory;
  isAdded: boolean;
  onSave: (id: number, title: string) => void;
  onDelete: () => void;
  onToggle: () => void;
}

export function Category({ data, isAdded, onSave, onDelete, onToggle }: ICategoryProps) {
  const [categoryTitle, setCategoryTitle] = useState<string>(data.title);
  const [isValid, setValid] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValid(categoryTitle.length > 1);
  }, [categoryTitle.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryTitle(e.target.value);
  };

  const handleEdit = () => {
    if (isEdit) {
      return;
    }
    const isConfirm = confirm('Вы хотите отредактировать категорию?');
    if (!isConfirm && inputRef.current) {
      inputRef.current.blur();
      return;
    }
    setEdit(true);
  };

  const handleDelete = () => {
    const isConfirm = confirm('Вы хотите удалить категорию?');
    if (!isConfirm) {
      return;
    }
    onDelete();
  };

  const handleSave = () => {
    onSave(data.id, categoryTitle);
    setEdit(false);
  };

  return (
    <S.Container>
      <CustomCheckbox
        checked={isAdded}
        onChange={onToggle}
      />
      <S.Input
        ref={inputRef}
        type="text"
        value={categoryTitle}
        onChange={handleChange}
        $isValid={isValid}
        onFocus={handleEdit}
      />
      {!isEdit && <S.DeleteBtn onClick={handleDelete} />}
      {isEdit && <S.SaveBtn onClick={handleSave} />}
    </S.Container>
  );
}
