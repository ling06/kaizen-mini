import { useEffect, useState } from 'react';
import * as S from './styles';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_INTERNATIONALIZATION_CONFIG, EDITOR_JS_TOOLS } from '@/utils/editor-tools';
import { FormControls } from '../FormControls';
import { useNavigate } from 'react-router-dom';
import { useCreateCompetitionMutation, useUpdateCompetitionMutation } from '@/store/api/competition.api';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface ICreateCompetitionFormProps {
  type: string;
}

let editor: undefined | EditorJS;

export function CreateCompetitionForm({ type }: ICreateCompetitionFormProps) {
  const navigate = useNavigate();
  const [competitionName, setCompetitionName] = useState<string>('');
  const [competitionLink, setCompetitionLink] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const [createCompetition, status] = useCreateCompetitionMutation();
  const [updateCompetition] = useUpdateCompetitionMutation();
  const { updatingCompetitionData } = useTypedSelector((state) => state.competition);


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

    if (type !== 'create') {
      updateCompetition({
        id: updatingCompetitionData!.id,
        title: competitionName,
        text: JSON.stringify(editorData ? editorData.blocks : []),
        link: competitionLink
      })
    } else {
      createCompetition({
        title: competitionName,
        text: JSON.stringify(editorData ? editorData.blocks : []),
        link: competitionLink
      });
    }
    navigate('/news')
  };

  const handleCancel = () => {
    navigate('/news');
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setCompetitionName(event.target.value);
    if (!isChangedName) {
      setChangedName(true);
    }
  };

  const handleChangeLink = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setCompetitionLink(event.target.value);
  };

  const controlsData = {
    names: {
      confirm: type === 'create' ?'Создать конкурс' : 'Изменить конкурс',
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
      <S.CompetitionNameInput
        $isValid={isValidName}
        $isChanged={isChangedName}
        value={competitionName}
        onChange={handleChangeName}
        type="text"
        placeholder= {type === 'create' ? "Введите название конкурса (обязательно)" : "Новое название"}
      />
      <S.EditorJsWrapper id="editorjs" />
      <S.CompetitionNameInput
        $isValid={isValidName}
        $isChanged={isChangedName}
        value={competitionLink}
        onChange={handleChangeLink}
        type="text"
        placeholder= {type === 'create' ? "Ссылка на конкурс в борбозе": "Новая ссылка"}
      />
      <S.Divider />
      <FormControls
        {...controlsData}
        containerStyles={{ padding: '25px 0px 25px' }}
      />
    </>
  );
}
