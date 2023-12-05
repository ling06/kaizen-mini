import {
  useCreateNewsCategoryMutation,
  useDeleteNewsCategoryMutation,
  useGetNewsCategoryQuery,
  useUpdateNewsCategoryMutation,
} from "@/store/api/newsCategory.api";
import { ModalForm } from "../ModalForm";
import * as S from "./styles";
import { useTypedSelector } from "@/shared/lib/hooks/useTypedSelector";
import { Category } from "./Category";
import { useActions } from "@/shared/lib/hooks/useActions";
import { INewsCategory } from "@/shared/model/types/news.types";
import { useEffect } from "react";

export function NewsCategoryForm() {
  const { data, isError, isFetching, isLoading } = useGetNewsCategoryQuery();
  const [createCategory] = useCreateNewsCategoryMutation();
  const [deleteCategory] = useDeleteNewsCategoryMutation();
  const [updateCategory] = useUpdateNewsCategoryMutation();
  const currentCategories = useTypedSelector(
    (state) => state.news.newsCategories
  );
  const {
    setLoaderActive,
    updateNewsCategory,
    deleteNewsCategory,
    addNewsCategory,
    setModalOpen,
  } = useActions();

  useEffect(() => {
    if (isFetching) {
      setLoaderActive(true);
    } else {
      setLoaderActive(false);
    }
  }, [isFetching]);

  const handleCreateCategory = () => {
    createCategory({ title: "Новая категория" }).then(() => {
      setLoaderActive(false);
    });
    // setLoaderActive(true);
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory({ id }).then((res) => {
      if (res.data.message === "Category has news") {
        alert("Нельзя удалить категорию, в которой есть новости!");
      } else if (res.data.message === "Category not found") {
        alert("Неправильный Id категории!");
      } else if (res.data.message === "Category deleted") {
        alert("Категория успешно удалена.");
      }
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  const handleUpdateCategory = (id: number, title: string) => {
    updateCategory({ id, title }).then(() => {
      updateNewsCategory({ id, title });
    });
    setLoaderActive(true);
  };

  const handeleToggleCategory = (isAdded: boolean, category: INewsCategory) => {
    if (isAdded) {
      deleteNewsCategory({ id: category.id });
      return;
    }
    addNewsCategory(category);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handlers = {
    cancel: handleClose,
    confirm: handleClose,
  };

  const names = {
    cancel: "Отмена",
    confirm: "Сохранить",
  };

  return (
    <ModalForm width="510px" handlers={handlers} names={names}>
      <S.CategoriesList>
        {data &&
          !isError &&
          !isLoading &&
          data.data.map((category) => {
            const isAdded = currentCategories.some(
              (cat) => cat.id === category.id
            );
            if (category.is_deleted) {
              return null;
            }
            return (
              <Category
                data={category}
                key={category.id}
                isAdded={isAdded}
                onDelete={() => {
                  handleDeleteCategory(category.id);
                }}
                onSave={handleUpdateCategory}
                onToggle={() => handeleToggleCategory(isAdded, category)}
              />
            );
          })}
      </S.CategoriesList>
      <S.AddCategoryBtn onClick={handleCreateCategory}>
        <S.AddCategoryIcon />
        добавить категорию
      </S.AddCategoryBtn>
    </ModalForm>
  );
}
