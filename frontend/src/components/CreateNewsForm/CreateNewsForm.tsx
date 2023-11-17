import { useEffect, useState } from "react";
import * as S from "./styles";
import { FormControls } from "../FormControls";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateNewsMutation,
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
} from "@/store/api/news.api";
import { useActions } from "@/hooks/useActions";
import { MODAL_TYPES } from "@/constants";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { CkEditor } from "../CkEditor";

interface ICreateNewsFormProps {
  type: string;
}

export function CreateNewsForm({ type }: ICreateNewsFormProps) {
  const {
    setModalOpen,
    setModalType,
    setNewsCategories,
    setLoaderActive,
    deleteNewsCategory,
  } = useActions();
  const [createNews] = useCreateNewsMutation();
  const navigate = useNavigate();
  const { newsId } = useParams();
  const [NewsName, setNewsName] = useState<string>("");
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isChangedName, setChangedName] = useState<boolean>(false);
  const categories = useTypedSelector((state) => state.news.newsCategories);
  const { data, isFetching } = useGetNewsByIdQuery(Number(newsId), {
    skip: !newsId,
  });
  const [updateNews] = useUpdateNewsMutation();
  const [ckEditorData, setCkEditorData] = useState<string>("");

  useEffect(() => {
    if (type === "edit" && data) {
      setNewsName(data.data.title);
      setValidName(true);
      setChangedName(false);
      setNewsCategories(data.data.categories || []);
    }
  }, [data, setNewsCategories, type]);

  const handleConfirm = async () => {
    // const editorData = await editor?.save().then((data) => data);

    if (!isValidName) {
      setChangedName(true);
      return;
    }

    if (type !== "edit") {
      createNews({
        title: NewsName,
        text: ckEditorData || "",
        NewsCategory: categories,
      })
        .then((res) => {
          if ("data" in res && res.data.result) {
            navigate("/news");
          } else {
            alert("Произошла ошибка при создании новости. Попробуйте ещё раз!");
          }
        })
        .catch((err) => {
          setLoaderActive(false);
          console.error(err);
          alert("Произошла ошибка при создании новости. Попробуйте ещё раз!");
        });
      setLoaderActive(true);
    }

    if (type === "edit") {
      updateNews({
        id: Number(newsId),
        title: NewsName,
        text: ckEditorData || "",
        NewsCategory: categories,
      })
        .then((res) => {
          if ("data" in res && res.data.result) {
            navigate("/news");
          }
        })
        .catch((err) => {
          setLoaderActive(false);
          console.error(err);
          alert(
            "Произошла ошибка при редактировании новости. Попробуйте ещё раз!"
          );
        });
      setLoaderActive(true);
    }
  };

  const handleCancel = () => {
    navigate("/news");
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
      confirm: type === "edit" ? "Сохранить" : "Создать новость",
      cancel: "Отмена",
    },
    handlers: {
      confirm: handleConfirm,
      cancel: handleCancel,
    },
  };

  const handleSetCkEditorData = (data: string) => {
    setCkEditorData(data);
  };

  const handleСancelCategori = (category: number) => {
    deleteNewsCategory({ id: category });
  };

  return (
    <>
      <S.Title>
        {type === "create" ? "Создание новости" : "Редактирование новости"}
      </S.Title>
      <S.NewsNameInput
        $isValid={isValidName}
        $isChanged={isChangedName}
        value={NewsName}
        onChange={handleChange}
        type="text"
        placeholder="Введите название новости (обязательно)"
      />
      {/* <S.EditorJsWrapper id="editorjs" /> */}
      <CkEditor onChange={handleSetCkEditorData} data={data?.data.text || ""} />
      <S.CategoriesList>
        {categories.length > 0 &&
          categories.map((category) => (
            <S.Category key={category.id}>
              <S.CategoryText>{category.title}</S.CategoryText>
              <S.CategoryImgDelete
                onClick={() => {
                  if (category.id !== undefined)
                    handleСancelCategori(category.id);
                }}
              />
            </S.Category>
          ))}

        {categories.length == 0 ? (
          <S.AddCategory onClick={handleOpenCategoriesModal}>
            <S.AddIcon />
            Добавить категории
          </S.AddCategory>
        ) : (
          <S.AddCategoryBtn onClick={handleOpenCategoriesModal} />
        )}
      </S.CategoriesList>

      <S.Divider />
      <FormControls
        {...controlsData}
        containerStyles={{ padding: "25px 0px 25px" }}
      />
    </>
  );
}
