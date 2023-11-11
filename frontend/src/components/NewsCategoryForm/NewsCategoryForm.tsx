import { useCreateNewsCategoryMutation, useDeleteNewsCategoryMutation, useGetNewsCategoryQuery, useUpdateNewsCategoryMutation } from '@/store/api/newsCategory.api';
import { ModalForm } from '../ModalForm';
import * as S from './styles';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Category } from './Category';
import { useActions } from '@/hooks/useActions';
import { INewsCategory } from '@/types/news.types';

export function NewsCategoryForm() {
  const { data, isError, isFetching } = useGetNewsCategoryQuery();
  const [createCategory] = useCreateNewsCategoryMutation();
  const [deleteCategory] = useDeleteNewsCategoryMutation();
  const [updateCategory] = useUpdateNewsCategoryMutation();
  const currentCategories = useTypedSelector((state) => state.news.newsCategories);
  const { setLoaderActive, deleteNewsCategory, addNewsCategory, setModalOpen } = useActions();


  const handleCreateCategory = () => {
    createCategory({ title: 'Новая категория' }).then(() => {
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory({ id }).then(() => {
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  const handleUpdateCategory = (id: number, title: string) => {
    updateCategory({ id, title }).then(() => {
      setLoaderActive(false);
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
  }

  const handlers = {
    cancel: handleClose,
    confirm: handleClose,
  };

  const names = {
    cancel: 'Отмена',
    confirm: 'Сохранить',
  };

  return (
    <ModalForm
      width="510px"
      handlers={handlers}
      names={names}>
      <S.CategoriesList>
        {data &&
          !isError &&
          !isFetching &&
          data.data.map((category) => {
            const isAdded = currentCategories.some((cat) => cat.id === category.id);
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
