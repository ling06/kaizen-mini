import { useEffect, useState } from 'react';
import { ModalForm } from '../ModalForm';
import * as S from './styles';
import { useCreateThemeMutation, useUpdateThemeMutation } from '@/store/api/theme.api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { MODAL_TYPES } from '@/constants';

export function CreateThemeForm() {
  const { setModalOpen, setLoaderActive } = useActions();

  const chapterId = useTypedSelector((state) => state.course.activeChapterId);
  const themeData = useTypedSelector((state) => state.course.updatingThemeData);
  const modalType = useTypedSelector((state) => state.modal.modalType);

  const [createTheme] = useCreateThemeMutation();
  const [updateTheme] = useUpdateThemeMutation();

  const [themeName, setThemeName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);

  useEffect(() => {
    if (modalType === MODAL_TYPES.editTheme && themeData) {
      setThemeName(themeData.title);
      setValidName(true);
      setChangedName(false);
    } else if(modalType === MODAL_TYPES.editTheme) {
      alert('Что-то пошло не так...');
      setModalOpen(false);
    }
    }, [modalType, setModalOpen, themeData]);

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
    confirm: `${modalType === MODAL_TYPES.editTheme ? 'Изменить' : 'Создать'} тему`,
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
