import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/constants';
import * as S from './styles';
import { AdminBtn } from '../AdminBtn';
import { useActions } from '@/hooks/useActions';
import { ICourse } from '@/types';
import { CustomSelect } from '../CustomSelect';

interface ICourseSelectProps {
  data: Array<ICourse>;
}

export function CourseSelect({ data }: ICourseSelectProps) {
  const { setModalOpen, setModalType } = useActions();
  const selectOptions = data.map((course) => {
    return {
      value: course.id,
      label: `Курс: ${course.title}`,
    };
  });


  const openCreateCourseModal = () => {
    setModalType(MODAL_TYPES.createCourse);
    setModalOpen(true);
  };

  return (
    <S.Container>
      <CustomSelect options={selectOptions} defaultValue={selectOptions[0]}/>
      <AdminBtn
        type={ADMIN_BTN_TYPES.add}
        onClick={openCreateCourseModal}
      />
    </S.Container>
  );
}
