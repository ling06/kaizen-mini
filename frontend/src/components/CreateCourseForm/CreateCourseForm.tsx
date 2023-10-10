import { useEffect, useState } from 'react';
import * as S from './styles';
import { CustomCheckbox } from '../CustomCheckbox';
import { ModalForm } from '../ModalForm';
import '@styles/editorjs.css';
import { useCreateCourseMutation } from '@/store/api/course.api';
import { useActions } from '@/hooks/useActions';

export function CreateCourseForm() {
  const { setModalOpen } = useActions();
  const [courseName, setCourseName] = useState<string>('');
  const [courseDescription, setCourseDescription] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const [createCourse, status] = useCreateCourseMutation();

  useEffect(() => {
    if(status.isSuccess) {
      setModalOpen(false);
    }
  }, [setModalOpen, status.isSuccess])
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setCourseName(event.target.value);
    if (!isChangedName) {
      setChangedName(true);
    }
  };

  const handleTeaxtAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCourseDescription(event.target.value);
  }

  const handleConfirm = () => {
    if(!isValidName) {
      setChangedName(true);
      return;
    }
    createCourse({
      title: courseName,
      description: courseDescription,
      is_open: 1,
    });

  };

  const handlers = {
    cancel: () => {},
    confirm: handleConfirm,
  };

  const names = {
    cancel: 'Отмена',
    confirm: 'Создать курс',
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
      <S.Textarea as={'textarea'} onChange={handleTeaxtAreaChange} value={courseDescription}></S.Textarea>
      <S.AddCourseImg>Обложка курса</S.AddCourseImg>
      <CustomCheckbox descr={'Все главы доступны сразу '} />
    </ModalForm>
  );
}
