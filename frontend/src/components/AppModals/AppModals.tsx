import { MODAL_TYPES } from "@/constants";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ModalLayout } from "@/layouts/ModalLayout";
import { CreateChapterForm } from "../CreateChapterForm";
import { CreateCourseForm } from "../CreateCourseForm";
import { CreateThemeForm } from "../CreateThemeForm";
import { NewsCategoryForm } from "../NewsCategoryForm";
import { useMemo } from "react";
import { ErrorBlock } from "../ErrorBlock";

interface IModals {
  isAdmin: boolean;
}

export function AppModals({ isAdmin }: IModals) {
  const { isModalOpen, modalType } = useTypedSelector((state) => state.modal);

  const modal = useMemo(() => {
    switch(modalType) {
      case MODAL_TYPES.createCourse:
        return <CreateCourseForm />
      case MODAL_TYPES.editCourse:
        return <CreateCourseForm />
      case MODAL_TYPES.createChapter:
        return <CreateChapterForm />
      case MODAL_TYPES.editChapter:
        return <CreateChapterForm />
      case MODAL_TYPES.createTheme:
        return <CreateThemeForm />
      case MODAL_TYPES.editTheme:
        return <CreateThemeForm />
      case MODAL_TYPES.newsCategory:
        return <NewsCategoryForm />
      default:
        return <ErrorBlock />
    }
  }, [modalType])

  return (
    <>
      {isModalOpen && isAdmin && (
        <ModalLayout modalType={modalType}>
          {modal}
        </ModalLayout>
      )}
    </>
  );
}
