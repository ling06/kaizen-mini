import { useState } from 'react';
import { ModalForm } from '../ModalForm';
import * as S from './styles';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useCreateChapterMutation } from '@/store/api/chapter.api';
import { Loading } from '../Loading';
import { useActions } from '@/hooks/useActions';

export function CreateChapterForm() {
  const courseId = useTypedSelector(state => state.course.id);
  const {setModalOpen} = useActions();
  const [createChapter, status] = useCreateChapterMutation();
  const [chapterName, setChapterName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);

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
      }).then(() => {
        setModalOpen(false);
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
      {status.isLoading && <Loading />}
    </ModalForm>
  );
}
