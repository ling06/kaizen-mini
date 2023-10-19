import { useEffect, useState } from 'react';
import { ModalForm } from '../ModalForm';
import * as S from './styles';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useCreateChapterMutation, useUpdateChapterMutation } from '@/store/api/chapter.api';
import { useActions } from '@/hooks/useActions';
import { MODAL_TYPES } from '@/constants';

export function CreateChapterForm() {
  const { id, updatingChapterData } = useTypedSelector(state => state.course);
  const formType = useTypedSelector(state => state.modal.modalType);
  const {setModalOpen, addChapter} = useActions();
  const [createChapter] = useCreateChapterMutation();
  const [updateChapter] = useUpdateChapterMutation();

  const [chapterName, setChapterName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const [isEditForm, setEditForm] = useState<boolean>(false);

  useEffect(() => {
    if(formType === MODAL_TYPES.editChapter && updatingChapterData) {
      setEditForm(true);
      setChapterName(updatingChapterData.title);
      setValidName(true);
      setChangedName(true);
    }
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setChapterName(event.target.value);
    if (!isChangedName) {
      setChangedName(true);
    }
  };

  const handleConfirm = () => {
    if(!isValidName) {
      setChangedName(true);
      return;
    }

    if(id && !isEditForm) {
      createChapter({
        title: chapterName,
        course_id: id,
      }).then((res) => {
        if('data' in res && res.data.result) {
          addChapter(res.data.data);
        }
        setModalOpen(false);
      }).catch((err) => {
        console.error(err);
      });
    }

    if(isEditForm && updatingChapterData && id) {
      updateChapter({
        course_id: id,
        id: Number(updatingChapterData.id),
        title: chapterName,
      })
    }
  }

  const handleCancel = () => {
    setModalOpen(false);
  }

  const handlers = {
    cancel: handleCancel,
    confirm: handleConfirm,
  };

  const names = {
    cancel: 'Отмена',
    confirm: 'Создать главу',
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
        value={chapterName}
        onChange={handleChange}
        placeholder="Введите название главы (обязательно)"
      />
      <S.AddChapterImg>Обложка главы</S.AddChapterImg>
    </ModalForm>
  );
}
