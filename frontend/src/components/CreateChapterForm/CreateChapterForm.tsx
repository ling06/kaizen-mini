import { useEffect, useState } from 'react';
import { ModalForm } from '../ModalForm';
import * as S from './styles';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useCreateChapterMutation, useGetChapterByIdQuery } from '@/store/api/chapter.api';
import { useActions } from '@/hooks/useActions';
import { selectCourse } from '@/store/api/course.api';

export function CreateChapterForm() {
  const courseId = useTypedSelector(state => selectCourse(state).data?.data.id);
  const formType = useTypedSelector(state => state.modal.modalType);
  // const {data} = useGetChapterByIdQuery();
  const {setModalOpen, addChapter} = useActions();
  const [createChapter] = useCreateChapterMutation();

  const [chapterName, setChapterName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);

  useEffect(() => {

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

    if(courseId) {
      createChapter({
        title: chapterName,
        course_id: courseId,
      }).then((res) => {
        if('data' in res && res.data.result) {
          addChapter(res.data.data);
        }
        setModalOpen(false);
      }).catch((err) => {
        console.error(err);
      });
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
