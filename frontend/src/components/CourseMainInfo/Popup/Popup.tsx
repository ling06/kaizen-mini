import ReactDOM from 'react-dom';
import * as S from './styles';
import { CustomSelectOption } from '@/components/CustomSelectOption';
import { ICourse } from '@/shared/types/course.types';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { useActions } from '@/shared/lib/hooks/useActions';
import { MODAL_TYPES } from '@/shared/constants';
import { useNavigate } from 'react-router-dom';

interface IPopupProps {
  coursesData: Array<ICourse>;
  onClose: () => void;
}

export function Popup({ coursesData, onClose }: IPopupProps) {
  const { setModalOpen, setModalType } = useActions();
  const selectedCourseid = useTypedSelector((state) => state.course.data.id);
  const modalRoot = document.querySelector('#modal-root');
  const navigate = useNavigate();
  if (!modalRoot) {
    return null;
  }

  const handleSelectCourse = (id: number) => {
    onClose();
    navigate(`/courses/${id}`);
  };

  const handleAddCourse = () => {
    onClose();
    setModalOpen(true);
    setModalType(MODAL_TYPES.createCourse);
  };

  return ReactDOM.createPortal(
    <S.Overlay onClick={onClose}>
      <S.Container>
        <S.CoursesList>
          {coursesData &&
            coursesData.map((course) => (
              <S.Course
                onClick={() => {
                  handleSelectCourse(course.id);
                }}>
                <CustomSelectOption
                  title={course.title}
                  key={course.id}
                  status={course.status}
                  isDeleted={!!course.is_deleted}
                  isSelected={Number(course.id) === Number(selectedCourseid)}
                />
              </S.Course>
            ))}
        </S.CoursesList>
        <S.AddCourseBtn onClick={handleAddCourse}>
          <S.AddCourseBtnTitle>Добавить курс</S.AddCourseBtnTitle>
          <S.AddCourseBtnIcon />
        </S.AddCourseBtn>
        <S.CloseBtnWrapper>
          <S.CloseBtn onClick={onClose}>Отмена</S.CloseBtn>
        </S.CloseBtnWrapper>
      </S.Container>
    </S.Overlay>,
    modalRoot
  );
}
