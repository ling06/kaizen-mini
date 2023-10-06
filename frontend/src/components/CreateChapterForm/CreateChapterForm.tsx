import { useState } from 'react';
import { ModalForm } from '../ModalForm';
import * as S from './styles';

export function CreateChapterForm() {
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

  const handlers = {
    cancel: () => {},
    confirm: () => {},
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
        placeholder="Введите название курса (обязательно)"
      />
      <S.AddChapterImg>Обложка главы</S.AddChapterImg>
    </ModalForm>
  );
}
