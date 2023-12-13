import { CreateChapterForm } from '../CreateChapterForm';
import { CreateCourseForm } from '../CreateCourseForm';
import { CreateThemeForm } from '../CreateThemeForm';
import { NewsCategoryForm } from '../NewsCategoryForm';
import { useMemo } from 'react';
import { ErrorBlock } from '../ErrorBlock';
import { SelectCourseForm } from '../SelectCourseForm';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { MODAL_TYPES } from '@/shared/model/constants';
import { ModalLayout } from '@/shared/ui/layouts';

interface IModals {
  isAdmin: boolean;
}

export function AppModals({ isAdmin }: IModals) {
  const { isModalOpen, modalType, modalPosition } = useTypedSelector((state) => state.modal);

  const modal = useMemo(() => {
    switch (modalType) {
      case MODAL_TYPES.createCourse:
        return <CreateCourseForm />;
      case MODAL_TYPES.editCourse:
        return <CreateCourseForm />;
      case MODAL_TYPES.createChapter:
        return <CreateChapterForm />;
      case MODAL_TYPES.editChapter:
        return <CreateChapterForm />;
      case MODAL_TYPES.createTheme:
        return <CreateThemeForm />;
      case MODAL_TYPES.editTheme:
        return <CreateThemeForm />;
      case MODAL_TYPES.newsCategory:
        return <NewsCategoryForm />;
      case MODAL_TYPES.selectCourse:
        return <SelectCourseForm />;
      default:
        return <ErrorBlock />;
    }
  }, [modalType]);

  return (
    <>
      {isModalOpen && isAdmin && (
        <ModalLayout
          modalType={modalType}
          modalPosition={modalPosition}>
          {modal}
        </ModalLayout>
      )}
    </>
  );
}
