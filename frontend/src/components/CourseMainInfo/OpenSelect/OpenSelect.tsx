import { AdminBtn } from '@/components/AdminBtn';
import * as S from './styles';
import { ICourse } from '@/shared/types/course.types';
import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/shared/constants';
import { useActions } from '@/shared/lib/hooks/useActions';
import { useDeleteCourseMutation, useRestoreCourseMutation, useUpdateCourseMutation } from '@/store/api/course.api';

interface IOpenSelectProps {
  courseData: ICourse;
  onOpen: () => void;
}

export function OpenSelect({ courseData, onOpen }: IOpenSelectProps) {
  const { setModalOpen, setModalType, setLoaderActive, setCourseData } = useActions();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const [restoreCourse] = useRestoreCourseMutation();

  const handleAddCourse = () => {
    setModalType(MODAL_TYPES.createCourse);
    setModalOpen(true);
  };

  const handleEditCourse = () => {
    if (!courseData.id) {
      console.error(`No course with id: ${courseData.id}!`);
      return;
    }
    setModalType(MODAL_TYPES.editCourse);
    setModalOpen(true);
  };

  const handleToggleCourseStatus = () => {
    if (!courseData.id) {
      console.error(`No course with id: ${courseData.id}!`);
      return;
    }
    updateCourse({
      id: courseData.id,
      status: Number(courseData.status) === 0 ? 1 : 0,
    }).then((res) => {
      if ('data' in res) {
        setCourseData(res.data.data);
      }
    });
    setLoaderActive(true);
  };

  const handleDeleteCourse = () => {
    deleteCourse({
      id: Number(courseData.id),
    }).then((res) => {
      if ('result' in res && !res.result) {
        alert('Что-то пошло не так...');
        console.error(`Course with id: ${courseData.id} not found!`);
      }
    });
    setLoaderActive(true);
  };

  const handleRestoreCourse = () => {
    restoreCourse({
      id: Number(courseData.id),
    }).then((res) => {
      if ('result' in res && !res.result) {
        alert('Что-то пошло не так...');
        console.error(`Course with id: ${courseData.id} not found!`);
      }
    });
    setLoaderActive(true);
  };

  return (
    <S.Container>
      <S.Wrapper onClick={onOpen}>
        <S.CourseTitle $isDeleted={!!courseData.is_deleted}>{courseData.title}</S.CourseTitle>
        <S.SelectIcon />
      </S.Wrapper>
      {courseData.status === 0 && <S.IsHiddenIcon />}
      <AdminBtn
        popupName="Курс"
        type={ADMIN_BTN_TYPES.edit}
        popupHandlers={{
          onAdd: handleAddCourse,
          onEdit: handleEditCourse,
          onHide: Number(courseData.status) === 1 ? handleToggleCourseStatus : undefined,
          onVisible: Number(courseData.status) === 0 ? handleToggleCourseStatus : undefined,
          onDelete: courseData.is_deleted ? undefined : handleDeleteCourse,
          onRestore: courseData.is_deleted ? handleRestoreCourse : undefined,
        }}
      />
    </S.Container>
  );
}
