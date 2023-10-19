import { ICourse } from '@/types/course.types';
import { AdminBtn } from '../AdminBtn/AdminBtn';
import { ProgressCounter } from '../ProgressCounter';
import * as S from './styles';
import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/constants';
import { useActions } from '@/hooks/useActions';
import { useUpdateCourseMutation } from '@/store/api/course.api';

interface ICustomSelectOpionsProps {
  data: ICourse;
}

export function CustomSelectOption({ data }: ICustomSelectOpionsProps) {
  const { setModalOpen, setModalType, setEditCourseData, setLoaderActive } = useActions();
  const [updateCourse] = useUpdateCourseMutation();

  const handleEditCourse = () => {
    setEditCourseData(data);
    setModalOpen(true);
    setModalType(MODAL_TYPES.editCourse);
  };

  const handleHideCourse = () => {
    updateCourse({
      id: data.id,
      status: data.status === 1 ? 0 : 1,
    }).then(() => {
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  return (
    <S.CustomSelectOpions>
      <ProgressCounter percentage={data.percentage?.percentage || 0} />
      <S.TextLabel>Курс: {data.title}</S.TextLabel>
      {data.status === 1 && <S.IsHiddenIcon />}
      <AdminBtn
        type={ADMIN_BTN_TYPES.edit}
        onClick={() => {}}
        popupHandlers={{
          onEdit: handleEditCourse,
          onHide: handleHideCourse,
        }}
      />
    </S.CustomSelectOpions>
  );
}
