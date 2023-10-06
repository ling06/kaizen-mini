import { useState } from 'react';
import { ModalForm } from '../ModalForm';
import * as S from './styles';

export function CreateThemeForm() {
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

  const handlers = {
    cancel: () => {},
    confirm: () => {},
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
