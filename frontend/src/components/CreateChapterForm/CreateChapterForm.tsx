import { useEffect, useState } from 'react';
import { ModalForm } from '../ModalForm';
import * as S from './styles';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useCreateChapterMutation, useUpdateChapterMutation } from '@/store/api/chapter.api';
import { useActions } from '@/hooks/useActions';
import { MODAL_TYPES } from '@/constants';
import { AddImage } from '../AddImage';
import { IUploadedImage } from '@/types/image.types';

export function CreateChapterForm() {
  const { data, updatingChapterData } = useTypedSelector((state) => state.course);
  const formType = useTypedSelector((state) => state.modal.modalType);
  const { setModalOpen, addChapter, setLoaderActive, changeChapter } = useActions();
  const [createChapter] = useCreateChapterMutation();
  const [updateChapter] = useUpdateChapterMutation();

  const [chapterName, setChapterName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const [isEditForm, setEditForm] = useState<boolean>(false);
  const [chapterImage, setChapterImage] = useState<IUploadedImage | null>(null);

  useEffect(() => {
    if (formType === MODAL_TYPES.editChapter && updatingChapterData) {
      setEditForm(true);
      setChapterName(updatingChapterData.title);
      setValidName(true);
      setChangedName(true);
    }
  }, [formType, updatingChapterData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setChapterName(event.target.value);
    if (!isChangedName) {
      setChangedName(true);
    }
  };

  const handleConfirm = () => {
    if (!isValidName) {
      setChangedName(true);
      return;
    }

    if (data?.id && !isEditForm) {
      createChapter({
        title: chapterName,
        course_id: data.id,
        image: chapterImage,
      })
        .then((res) => {
          if ('data' in res && res.data.result) {
            addChapter(res.data.data);
          }
          setModalOpen(false);
        })
        .catch((err) => {
          console.error(err);
        });
      setLoaderActive(true);
    }

    if (isEditForm && updatingChapterData && data?.id) {
      updateChapter({
        course_id: data.id,
        id: Number(updatingChapterData.id),
        title: chapterName,
        image: chapterImage,
      }).then((res) => {
        if ('data' in res) {
          changeChapter(res.data.data);
        }
        setLoaderActive(false);
        setModalOpen(false);
      });
      setLoaderActive(true);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handlers = {
    cancel: handleCancel,
    confirm: handleConfirm,
  };

  const handleSetChapterImage = (base64: string, extension: string) => {
    setChapterImage({ data: base64, extension });
  };

  const handleDeleteChapterImage = () => {
    setChapterImage(null);
  };

  const names = {
    cancel: 'Отмена',
    confirm: `${isEditForm ? 'Изменить' : 'Создать'} главу`,
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
      <S.BottomContainer>
        <AddImage
          onSet={handleSetChapterImage}
          name="Обложка главы"
          imageData={chapterImage}
          onDelete={handleDeleteChapterImage}
        />
      </S.BottomContainer>
    </ModalForm>
  );
}
