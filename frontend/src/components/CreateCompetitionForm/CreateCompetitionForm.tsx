import { useEffect, useState } from 'react';
import * as S from './styles';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_INTERNATIONALIZATION_CONFIG, EDITOR_JS_TOOLS } from '@/utils/editor-tools';
import { FormControls } from '../FormControls';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateCompetitionMutation, useGetCompetitionByIdQuery, useUpdateCompetitionMutation } from '@/store/api/competition.api';
import { useActions } from '@/hooks/useActions';
import { CkEditor } from '../CkEditor';

interface ICreateCompetitionFormProps {
  type: string;
}

let editor: undefined | EditorJS;

export function CreateCompetitionForm({ type }: ICreateCompetitionFormProps) {
  const { setLoaderActive } = useActions();
  const navigate = useNavigate();
  const { competitionId } = useParams();
  const [competitionName, setCompetitionName] = useState<string>('');
  const [competitionLink, setCompetitionLink] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const [createCompetition] = useCreateCompetitionMutation();
  const [updateCompetition] = useUpdateCompetitionMutation();
  const { data, isFetching } = useGetCompetitionByIdQuery(Number(competitionId), {
    skip: !competitionId,
  });
  const [ckEditorData, setCkEditorData] = useState<string>('');


  useEffect(() => {
    if (data && type === 'edit') {
      setCompetitionName(data.data.title);
      setCompetitionLink(data.data.link);
      setValidName(true);
      setChangedName(false);
      setCkEditorData(data.data.text);
    }
  }, [data, type]);

  //TODO: при удалении данного useEffect ckEditor выдает ошибку при добавлении изображений. Переделать эту СТРАННУЮ ШТУКУ.
  useEffect(() => {
    if (!editor && !isFetching && !data) {
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
    return () => {
      editor = undefined;
    };
  }, [data, isFetching]);

  const handleConfirm = async () => {
    // const editorData = await editor?.save().then((data) => data);

    if (!isValidName) {
      setChangedName(true);
      return;
    }

    if (type !== 'create') {
      updateCompetition({
        id: Number(competitionId),
        title: competitionName,
        text: ckEditorData,
        link: competitionLink,
      })
        .then((res) => {
          setLoaderActive(false);
          if ('data' in res && res.data.result) {
            navigate('/news');
          } else {
            alert('Произошла ошибка при сохранении конкурса. Попробуйте ещё раз!');
          }
        })
        .catch((err) => {
          setLoaderActive(false);
          console.error(err);
          alert('Произошла ошибка при сохранении конкурса. Попробуйте ещё раз!');
        });
      setLoaderActive(true);
    } else {
      createCompetition({
        title: competitionName,
        text: ckEditorData,
        link: competitionLink,
      })
        .then((res) => {
          setLoaderActive(false);
          if ('data' in res && res.data.result) {
            navigate('/news');
          } else {
            alert('Произошла ошибка при создании конкурса. Попробуйте ещё раз!');
          }
        })
        .catch((err) => {
          setLoaderActive(false);
          console.error(err);
          alert('Произошла ошибка при создании конкурса. Попробуйте ещё раз!');
        });
      setLoaderActive(true);
    }
  };

  const handleCancel = () => {
    navigate('/news');
  };

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
      confirm: type === 'create' ? 'Создать конкурс' : 'Изменить конкурс',
      cancel: 'Отмена',
    },
    handlers: {
      confirm: handleConfirm,
      cancel: handleCancel,
    },
  };

  const handleSetCkEditorData = (data: string) => {
    setCkEditorData(data);
  }

  return (
    <>
      <S.Title>{type === 'create' ? 'Создание конкурса' : 'Редактирование конкурса'}</S.Title>
      <S.CompetitionNameInput
        $isValid={isValidName}
        $isChanged={isChangedName}
        value={competitionName}
        onChange={handleChangeName}
        type="text"
        placeholder={type === 'create' ? 'Введите название конкурса (обязательно)' : 'Новое название'}
      />
      <CkEditor onChange={handleSetCkEditorData} data={data?.data.text || ""} type={type}/>
      <S.CompetitionNameInput
        $isValid={isValidName}
        $isChanged={isChangedName}
        value={competitionLink}
        onChange={handleChangeLink}
        type="text"
        placeholder={type === 'create' ? 'Ссылка на конкурс в борбозе' : 'Новая ссылка'}
      />
      <S.Divider />
      <FormControls
        {...controlsData}
        containerStyles={{ padding: '25px 0px 25px' }}
      />
    </>
  );
}
