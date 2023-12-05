import { useEffect, useMemo, useState } from 'react';
import * as S from './styles';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_INTERNATIONALIZATION_CONFIG, EDITOR_JS_TOOLS } from '@/shared/lib/editor-tools';
import { FormControls } from '../FormControls';
import { CreateTestForm } from '../CreateTestForm';
import {
  useCreateLessonMutation,
  useGetLessonByIdQuery,
  useUpdateLessonMutation,
} from '@/store/api/lesson.api';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { useActions } from '@/shared/lib/hooks/useActions';
import { CkEditor } from '../CkEditor';

interface ICreateLessonFormProps {
  type: string;
}

let editor: undefined | EditorJS;

export function CreateLessonForm({ type }: ICreateLessonFormProps) {
  const { themeId, courseId, chapterId, lessonId } = useParams();
  const { data, isError, isFetching } = useGetLessonByIdQuery(`${lessonId}`, {
    skip: !lessonId,
  });
  const tests = useTypedSelector((state) => state.lesson.tests);
  const { addEmptyTest, setTestsData, setLoaderActive, resetTestsData } = useActions();

  const [createLesson] = useCreateLessonMutation();
  const [updateLesson] = useUpdateLessonMutation();
  const [lessonName, setLessonName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const navigation = useNavigate();
  const [ckEditorData, setCkEditorData] = useState<string>('');

  useEffect(() => {
    if (data) {
      setLessonName(data.data.title);
      setValidName(true);
      setChangedName(false);
      setTestsData(data.data.tests);
    }

    return () => {
      resetTestsData();
    }
  }, [data, isError, isFetching, resetTestsData, setTestsData]);

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
        console.error(e);
      }
    }

    return () => {
      if (editor) {
        try {
          editor.destroy();
        } catch(err) {
          console.log(err);
        }
        editor = undefined;
      }
    };
  }, [data, isFetching]);

  /* 
TODO: на фронте создаются id для новых сущностей, и при запросе этих id не должно быть. 
Все это очень похоже на костыль, но пока не знаю как лучше решить эту проблему
*/
  const testsDataWithoutFrontIds = useMemo(() => {
    return tests.map((test) => {
      const { id, answers, ...rest } = test;
      const clearAnswers = answers.map((answer) => {
        const { id, ...rest } = answer;
        
        if (id.length === 21 && typeof id === 'string') {
          return rest;
        }
        return answer;
      });
      if (id.length === 21 && typeof id === 'string') {
        return {
          ...rest,
          answers: clearAnswers,
        };
      }
      return {
        ...rest,
        answers: clearAnswers,
        id,
      };
    });
  }, [tests]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setLessonName(event.target.value);
    if (!isChangedName) {
      setChangedName(true);
    }
  };

  const handleConfirm = async () => {
    if (!isValidName) {
      setChangedName(true);
      return;
    }

    if (type === 'edit') {
      updateLesson({
        id: Number(lessonId),
        theme_id: Number(data?.data.theme_id),
        title: lessonName,
        description: ckEditorData || "",
        tests: testsDataWithoutFrontIds,
      })
        .then((res) => {
          if ('data' in res) {
            navigation(`/courses/${courseId}/${chapterId}/${themeId}/${res.data.data.id}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
        setLoaderActive(true);

      return;
    }
   

    createLesson({
      title: lessonName,
      theme_id: Number(themeId),
      description: ckEditorData || "",
      tests: testsDataWithoutFrontIds,
    })
      .then((res) => {
        if ('data' in res && res.data.result) {
          navigation(`/courses/${courseId}/${chapterId}/${themeId}/${res.data.data.id}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
      setLoaderActive(true);
  };

  const controlsData = {
    names: {
      confirm: type === 'create' ? 'Создать урок' : 'Сохранить',
      cancel: 'Отмена',
    },
    handlers: {
      confirm: handleConfirm,
      cancel: () => {
        navigation(`/courses/${courseId}/${chapterId}/${themeId}`);
      },
    },
  };

  const handleAddEmptyTest = () => {
    addEmptyTest();
  };

  const handleSetCkEditorData = (data: string) => {
    setCkEditorData(data);
  }

  return (
    <>
      <S.Title>{type === 'create' ? 'Создание урока' : 'Редактирование урока'}</S.Title>
      <S.LessonNameInput
        $isValid={isValidName}
        $isChanged={isChangedName}
        value={lessonName}
        onChange={handleChange}
        type="text"
        placeholder="Введите название урока (обязательно)"
      />
      <CkEditor onChange={handleSetCkEditorData} data={data?.data.description || ""}/>
      <S.TestWrapper>
        {tests.length > 0 && tests.map((test) => <CreateTestForm data={test} />)}
        <S.AddTest onClick={handleAddEmptyTest}>
          <S.AddTestIcon />
          добавить тест
        </S.AddTest>
      </S.TestWrapper>
      <S.Divider />
      <FormControls
        {...controlsData}
        containerStyles={{ padding: '25px 0px 25px' }}
      />
    </>
  );
}
