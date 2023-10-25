import { useState } from 'react';
import { ModalForm } from '../ModalForm';
import * as S from './styles';
import { useCreateThemeMutation } from '@/store/api/theme.api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';

export function CreateThemeForm() {
  const { setModalOpen, setLoaderActive } = useActions();
  const chapterId = useTypedSelector((state) => state.course.activeChapterId);
  const [createTheme] = useCreateThemeMutation();
  const [themeName, setThemeName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setThemeName(event.target.value);
    if (!isChangedName) {
      setChangedName(true);
    }
  };

  const handleConfirm = () => {
    if (!isValidName) {
      setChangedName(true);
      return;
    }
    createTheme({
      title: themeName,
      chapter_id: chapterId ? chapterId : 0,
    })
      .then(() => {
        setModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
        alert('Что-то пошло не так');
      });
    setLoaderActive(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handlers = {
    cancel: handleCancel,
    confirm: handleConfirm,
  };

  const names = {
    cancel: 'Отмена',
    confirm: 'Создать тему',
  };
  return (
    <ModalForm
      handlers={handlers}
      names={names}
      width="509px">
      <S.InputName
        type="text"
        $isValid={isValidName}
        $isChanged={isChangedName}
        value={themeName}
        onChange={handleChange}
        placeholder="Введите название темы (обязательно)"
      />
    </ModalForm>
  );
}
