/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import * as S from './styles';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_INTERNATIONALIZATION_CONFIG, EDITOR_JS_TOOLS } from '@/utils/editor-tools';
import { FormControls } from '../FormControls';
import { CreateTestForm } from '../CreateTestForm';
import { useCreateLessonMutation } from '@/store/api/lesson.api';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../Loading';

interface ICreateLessonFormProps {
  type: string;
}

let editor: undefined | EditorJS;

export function CreateLessonForm({ type }: ICreateLessonFormProps) {
  const [createLesson, status] = useCreateLessonMutation();
  const [lessonName, setLessonName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const [isTest, setTest] = useState<boolean>(false);
  const navigation = useNavigate();
  const { themeId } = useParams();


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
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setLessonName(event.target.value);
    if (!isChangedName) {
      setChangedName(true);
    }
  };

  const handleConfirm = async () => {
    const editorData = await editor?.save().then((data) => data);
    
    const editorBlocksData = JSON.stringify(editorData?.blocks || []);

    console.log(editorBlocksData);
    

    if (!isValidName) {
      setChangedName(true);
      return;
    }

    createLesson({
      title: lessonName,
      theme_id: Number(themeId),
      description: editorBlocksData,
    })
      .then(() => {
        editor?.clear();
        editor = undefined;
        navigation(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const controlsData = {
    names: {
      confirm: 'Создать урок',
      cancel: 'Отмена',
    },
    handlers: {
      confirm: handleConfirm,
      cancel: () => {},
    },
  };

  return (
    <>
      {status.isLoading && <Loading />}
      <S.Title>{type === 'create' ? 'Создание урока' : 'Редактирование урока'}</S.Title>
      <S.LessonNameInput
        $isValid={isValidName}
        $isChanged={isChangedName}
        value={lessonName}
        onChange={handleChange}
        type="text"
        placeholder="Введите название урока (обязательно)"
      />
      <S.EditorJsWrapper id="editorjs" />
      <S.TestWrapper>
        {isTest ? (
          <CreateTestForm />
        ) : (
          <S.AddTest
            onClick={() => {
              setTest(true);
            }}>
            <S.AddTestIcon />
            добавить тест
          </S.AddTest>
        )}
      </S.TestWrapper>
      <S.Divider />
      <FormControls
        {...controlsData}
        containerStyles={{ padding: '25px 0px 25px' }}
      />
    </>
  );
}
