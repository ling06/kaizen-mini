import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/constants';
import * as S from './styles';
import { AdminBtn } from '../AdminBtn';
import { useActions } from '@/hooks/useActions';
import { ICourse } from '@/types';
import Select, { components } from 'react-select';

interface ICourseSelectProps {
  data: Array<ICourse>;
}

export function CourseSelect({ data }: ICourseSelectProps) {
  const { setModalOpen, setModalType } = useActions();
  const selectOptions = data.map((course) => {
    return {
      value: course.id,
      label: course.title,
    };
  });
  const selectStyles = {
    container: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: 'transparent',
      width: '50%',
      border: '0',
      color: '#000',
      fontSize: '24.923px',
      fontWeight: '700',
      lineHeight: '120%',
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: 'transparent',
      border: '0',
    }),
  };

  const openCreateCourseModal = () => {
    setModalType(MODAL_TYPES.createCourse);
    setModalOpen(true);
  };

  return (
    <S.Container>
      <Select
        options={selectOptions}
        styles={selectStyles}
      />
      <AdminBtn
        type={ADMIN_BTN_TYPES.add}
        onClick={openCreateCourseModal}
      />
    </S.Container>
  );
}
