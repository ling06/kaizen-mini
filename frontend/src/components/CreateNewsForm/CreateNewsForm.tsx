
import { useEffect, useState } from 'react';
import * as S from './styles';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_INTERNATIONALIZATION_CONFIG, EDITOR_JS_TOOLS } from '@/utils/editor-tools';
import { FormControls } from '../FormControls';
import { useNavigate } from 'react-router-dom';
import { useCreateNewsMutation } from '@/store/api/news.api';

interface ICreateNewsFormProps {
  type: string;
}

let editor: undefined | EditorJS;

export function CreateNewsForm({ type }: ICreateNewsFormProps) {
  const navigation = useNavigate();
  const [NewsName, setNewsName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const [createNews, status] = useCreateNewsMutation();


  useEffect(() => {
    if (!editor) {
      try {
        editor = new EditorJS({
          holder: 'editorjs',
          tools: EDITOR_JS_TOOLS,
          i18n: EDITOR_INTERNATIONALIZATION_CONFIG,
          inlineToolbar: true,
        });
      } catch (e) {
        console.log(e);
      }
    }

    if(status.isSuccess) {
      editor?.clear();
      editor = undefined;
      navigation('/news');
    }

  }, [navigation, status.isSuccess]);

  const handleConfirm = async () => {
    const editorData = await editor?.save().then((data) => data);

    if (!isValidName) {
      setChangedName(true);
      return;
    }

    createNews({
      title: NewsName,
      text: JSON.stringify(editorData ? editorData.blocks : []),
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setNewsName(event.target.value);
    if (!isChangedName) {
      setChangedName(true);
    }
  };

  const controlsData = {
    names: {
      confirm: 'Создать новость',
      cancel: 'Отмена',
    },
    handlers: {
      confirm: handleConfirm,
      cancel: () => {},
    },
  };

  return (
    <>
      <S.Title>{type === 'create' ? 'Создание новости' : 'Редактирование новости'}</S.Title>
      <S.NewsNameInput
        $isValid={isValidName}
        $isChanged={isChangedName}
        value={NewsName}
        onChange={handleChange}
        type="text"
        placeholder="Введите название новости (обязательно)"
      />
      <S.EditorJsWrapper id="editorjs" />
      <S.Divider />
      <FormControls
        {...controlsData}
        containerStyles={{ padding: '25px 0px 25px' }}
      />
    </>
  );
}
