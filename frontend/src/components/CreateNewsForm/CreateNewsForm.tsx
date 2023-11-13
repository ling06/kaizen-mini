import { useEffect, useState } from 'react';
import * as S from './styles';
import EditorJS from '@editorjs/editorjs';
// import { EDITOR_INTERNATIONALIZATION_CONFIG, EDITOR_JS_TOOLS } from '@/utils/editor-tools';
import { FormControls } from '../FormControls';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateNewsMutation, useGetNewsByIdQuery, useUpdateNewsMutation } from '@/store/api/news.api';
import { useActions } from '@/hooks/useActions';
import { MODAL_TYPES } from '@/constants';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { CkEditor } from '../CkEditor';

interface ICreateNewsFormProps {
  type: string;
}

let editor: undefined | EditorJS;

export function CreateNewsForm({ type }: ICreateNewsFormProps) {
  const { setModalOpen, setModalType, setNewsCategories, setLoaderActive } = useActions();
  const [createNews] = useCreateNewsMutation();
  const navigate = useNavigate();
  const { newsId } = useParams();
  const [NewsName, setNewsName] = useState<string>('');
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const categories = useTypedSelector((state) => state.news.newsCategories);
  const { data, isFetching } = useGetNewsByIdQuery(Number(newsId), {
    skip: !newsId,
  });
  const [updateNews] = useUpdateNewsMutation();
  const [ckEditorData, setCkEditorData] = useState<string>('');

  useEffect(() => {
    if (type === 'edit' && data) {
      setNewsName(data.data.title);
      setValidName(true);
      setChangedName(false);
      setNewsCategories(data.data.categories || []);

      // if (!editor) {
      //   try {
      //     editor = new EditorJS({
      //       holder: 'editorjs',
      //       tools: EDITOR_JS_TOOLS,
      //       i18n: EDITOR_INTERNATIONALIZATION_CONFIG,
      //       inlineToolbar: true,
      //       data: {
      //         blocks: JSON.parse(data.data.text || '[]'),
      //       },
      //     });
      //   } catch (e) {
      //     console.log(e);
      //   }
      // }
    }
  }, [data, setNewsCategories, type]);

  // useEffect(() => {
  //   if (!editor && !data && !isFetching) {
  //     try {
  //       editor = new EditorJS({
  //         holder: 'editorjs',
  //         tools: EDITOR_JS_TOOLS,
  //         i18n: EDITOR_INTERNATIONALIZATION_CONFIG,
  //         inlineToolbar: true,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   return () => {
  //     editor = undefined;
  //   };
  // }, [data, isFetching]);

  const handleConfirm = async () => {
    const editorData = await editor?.save().then((data) => data);

    if (!isValidName) {
      setChangedName(true);
      return;
    }

    if (type !== 'edit') {
      createNews({
        title: NewsName,
        text: ckEditorData,
        NewsCategory: categories,
      })
        .then((res) => {
          if ('data' in res && res.data.result) {
            navigate('/news');
          } else {
            alert('Произошла ошибка при создании новости. Попробуйте ещё раз!');
          }
        })
        .catch((err) => {
          setLoaderActive(false);
          console.error(err);
          alert('Произошла ошибка при создании новости. Попробуйте ещё раз!');
        });
      setLoaderActive(true);
    }

    if (type === 'edit') {
      updateNews({
        id: Number(newsId),
        title: NewsName,
        text: JSON.stringify(editorData ? editorData.blocks : []),
        NewsCategory: categories,
      })
        .then((res) => {
          if ('data' in res && res.data.result) {
            navigate('/news');
          }
        })
        .catch((err) => {
          setLoaderActive(false);
          console.error(err);
          alert('Произошла ошибка при редактировании новости. Попробуйте ещё раз!');
        });
      setLoaderActive(true);
    }
  };

  const handleCancel = () => {
    navigate('/news');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidName(event.target.value.length > 1);
    setNewsName(event.target.value);
    if (!isChangedName) {
      setChangedName(true);
    }
  };

  const handleOpenCategoriesModal = () => {
    setModalType(MODAL_TYPES.newsCategory);
    setModalOpen(true);
  };

  const controlsData = {
    names: {
      confirm: type === 'edit' ? 'Сохранить' : 'Создать новость',
      cancel: 'Отмена',
    },
    handlers: {
      confirm: handleConfirm,
      cancel: handleCancel,
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
      {/* <S.EditorJsWrapper id="editorjs" /> */}
      <CkEditor onChange={setCkEditorData}/>
      {categories.length > 0 && (
        <S.CategoriesList>
          {categories.map((category) => (
            <S.Category>{category.title}</S.Category>
          ))}
        </S.CategoriesList>
      )}
      <S.AddCategory onClick={handleOpenCategoriesModal}>
        <S.AddIcon />
        добавить категории
      </S.AddCategory>
      <S.Divider />
      <FormControls
        {...controlsData}
        containerStyles={{ padding: '25px 0px 25px' }}
      />
    </>
  );
}
