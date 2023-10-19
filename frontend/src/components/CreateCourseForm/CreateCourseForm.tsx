import { useEffect, useState } from 'react';
import * as S from './styles';
import { CustomCheckbox } from '../CustomCheckbox';
import { ModalForm } from '../ModalForm';
import '@styles/editorjs.css';
import { useCreateCourseMutation, useUpdateCourseMutation } from '@/store/api/course.api';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { MODAL_TYPES } from '@/constants';

export function CreateCourseForm() {
  const { setModalOpen } = useActions();
  const modalType = useTypedSelector((state) => state.modal.modalType);
  const editCourse = useTypedSelector((state) => state.course.editCourseData);

  const [courseName, setCourseName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const [isEditForm, setEditForm] = useState<boolean>(false);
  
  const [courseDescription, setCourseDescription] = useState<string>('');

  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();

  useEffect(() => {
    const isEdit = modalType === MODAL_TYPES.editCourse;
    setEditForm(isEdit);
    if (isEdit && editCourse) {
      setCourseName(editCourse.title);
      setChangedName(true);
      setValidName(true);
      setCourseDescription(editCourse.description);
    }
  }, [editCourse, modalType]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setCourseName(event.target.value);
    if (!isChangedName) {
      setChangedName(true);
    }
  };

  const handleTeaxtAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCourseDescription(event.target.value);
  };

  const handleConfirm = () => {
    if (!isValidName) {
      setChangedName(true);
      return;
    }

    if (!isEditForm) {
      createCourse({
        title: courseName,
        description: courseDescription,
        is_open: 1,
      }).then(() => setModalOpen(false));
    }

    if (isEditForm && editCourse && editCourse.id) {
      updateCourse({
        id: editCourse.id,
        title: courseName,
        description: courseDescription,
      }).then(() => setModalOpen(false));
    }
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
    confirm: `${modalType === 'edit' ? 'Изменить' : 'Создать'} курс`,
  };

  return (
    <ModalForm
      width="1240px"
      handlers={handlers}
      names={names}>
      <S.NameInput
        type="text"
        $isValid={isValidName}
        $isChanged={isChangedName}
        value={courseName}
        onChange={handleChange}
        placeholder="Введите название курса (обязательно)"
      />
      <S.Textarea
        as={'textarea'}
        onChange={handleTeaxtAreaChange}
        value={courseDescription}></S.Textarea>
      <S.AddCourseImg>Обложка курса</S.AddCourseImg>
      <CustomCheckbox descr={'Все главы доступны сразу '} />
    </ModalForm>
  );
}
