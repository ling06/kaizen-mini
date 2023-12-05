import { useEffect, useState } from 'react';
import * as S from './styles';
import { ModalForm } from '../ModalForm';
import '@styles/editorjs.css';
import { useCreateCourseMutation, useUpdateCourseMutation } from '@/store/api/course.api';
import { useActions } from '@/shared/lib/hooks/useActions';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { MODAL_TYPES } from '@/shared/model/constants';
import { AddImage } from '../AddImage';
import { IImage, IUploadedImage } from '@/shared/model/types/image.types';
import { useNavigate } from 'react-router-dom';

export function CreateCourseForm() {
  const { setModalOpen, setLoaderActive } = useActions();
  const modalType = useTypedSelector((state) => state.modal.modalType);
  const courseData = useTypedSelector((state) => state.course.data);

  const [courseName, setCourseName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const [isEditForm, setEditForm] = useState<boolean>(false);
  const [courseImage, setCourseImage] = useState<IUploadedImage | IImage | null>(null);

  const [courseDescription, setCourseDescription] = useState<string>('');

  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();

  const navigate = useNavigate();

  useEffect(() => {
    const isEdit = modalType === MODAL_TYPES.editCourse;
    setEditForm(isEdit);
    if (isEdit && courseData) {
      setCourseName((prevState) => courseData?.title || prevState);
      setChangedName(true);
      setValidName(true);
      setCourseDescription((prevState) => courseData?.description || prevState);
      setCourseImage(courseData?.image || null);
    }
  }, [courseData, modalType]);

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
        image: courseImage,
      }).then((res) => {
        if('data' in res) {
          setModalOpen(false);
          navigate(`/courses/${res.data.data.id}`);
        }
      });
      setLoaderActive(true);
    }

    if (isEditForm && courseData && courseData.id) {
      updateCourse({
        id: courseData.id,
        title: courseName,
        description: courseDescription,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        image: courseImage ? courseImage.id ? {id: courseImage.id} : courseImage : null,
      }).then(() => setModalOpen(false));
      setLoaderActive(true);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleSetCourseImage = (base64: string, extension: string) => {
    setCourseImage({ data: base64, extension });
  };

  const handleDeleteCourseImage = () => {
    setCourseImage(null);
  };

  const handlers = {
    cancel: handleCancel,
    confirm: handleConfirm,
  };

  const names = {
    cancel: 'Отмена',
    confirm: `${modalType === MODAL_TYPES.editCourse ? 'Изменить' : 'Создать'} курс`,
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
      <S.BottomContainer>
        <AddImage
          onSet={handleSetCourseImage}
          name="Обложка курса"
          imageData={courseImage}
          onDelete={handleDeleteCourseImage}
          previewImageStyles={{
            maxWidth: '342px',
          }}
        />
      </S.BottomContainer>
    </ModalForm>
  );
}
