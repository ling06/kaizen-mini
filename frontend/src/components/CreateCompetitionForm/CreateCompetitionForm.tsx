import { useEffect, useState } from 'react';
import * as S from './styles';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_INTERNATIONALIZATION_CONFIG, EDITOR_JS_TOOLS } from '@/utils/editor-tools';
import { FormControls } from '../FormControls';
import { useNavigate } from 'react-router-dom';
import { useCreateNewsMutation } from '@/store/api/news.api';
import { useActions } from '@/hooks/useActions';
import { MODAL_TYPES } from '@/constants';
import { useCreateCompetitionMutation } from '@/store/api/competition.api';

interface ICreateCompetitionFormProps {
  type: string;
}

let editor: undefined | EditorJS;

export function CreateCompetitionForm({ type }: ICreateCompetitionFormProps) {
  const { setModalOpen, setModalType } = useActions();
  const navigate = useNavigate();
  const [competitionName, setCompetitionName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const [createCompetition, status] = useCreateCompetitionMutation();

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

    if (status.isSuccess) {
      editor?.clear();
      editor = undefined;
      navigate('/news');
    }
  }, [navigate, status.isSuccess]);

  const handleConfirm = async () => {
    const editorData = await editor?.save().then((data) => data);

    if (!isValidName) {
      setChangedName(true);
      return;
    }

    createCompetition({
      title: competitionName,
      text: JSON.stringify(editorData ? editorData.blocks : []),
    });
  };

  const handleCancel = () => {
    navigate('/news');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setCompetitionName(event.target.value);
    if (!isChangedName) {
      setChangedName(true);
    }
  };

  const handleOpenCategoriesModal = () => {
    setModalType(MODAL_TYPES.newsCategory);
    setModalOpen(true);
  }

  const controlsData = {
    names: {
      confirm: 'Создать конкурс',
      cancel: 'Отмена',
    },
    handlers: {
      confirm: handleConfirm,
      cancel: handleCancel,
    },
  };

  return (
    <>
      <S.Title>{type === 'create' ? 'Создание конкурса' : 'Редактирование конкурса'}</S.Title>
      <S.NewsNameInput
        $isValid={isValidName}
        $isChanged={isChangedName}
        value={competitionName}
        onChange={handleChange}
        type="text"
        placeholder="Введите название конкурса (обязательно)"
      />
      <S.EditorJsWrapper id="editorjs" />
      <button onClick={handleOpenCategoriesModal}>Open modal</button>
      <S.Divider />
      <FormControls
        {...controlsData}
        containerStyles={{ padding: '25px 0px 25px' }}
      />
    </>
  );
}
