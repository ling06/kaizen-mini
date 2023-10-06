import { useState } from 'react';
import * as S from './styles';
import { CustomCheckbox } from '../CustomCheckbox';
import { ModalForm } from '../ModalForm';
import '@styles/editorjs.css';



export function CreateCourseForm() {
 
  const [courseName, setCourseName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setCourseName(event.target.value);
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
        <S.Textarea
          as={'textarea'}></S.Textarea>
      <S.AddCourseImg>Обложка курса</S.AddCourseImg>
      <CustomCheckbox descr={'Все главы доступны сразу '} />
    </ModalForm>
  );
}
