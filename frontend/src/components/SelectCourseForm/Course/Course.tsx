import * as S from './styles';
import { DndBtn } from '@/components/DndBtn';
import { CourseProgress } from '@/components/CourseProgress';
import { CourseTitle } from '@/components/CourseTitle';
import { css } from 'styled-components';
import { AdminBtn } from '@/components/AdminBtn';
import { useNavigate } from 'react-router-dom';
import { useDeleteCourseMutation, useRestoreCourseMutation, useUpdateCourseMutation } from '@/store/api/course.api';
import { useActions } from '@/shared/lib/hooks/useActions';
import { IS_MOBILE, MODAL_TYPES, ADMIN_BTN_TYPES } from '@/shared/model/constants';
import { ModalPosition } from '@/shared/model/types/common.types';
import { ICourse } from '@/shared/model/types/course.types';

interface ICourseProps {
  data: ICourse;
  setDraggable: () => void;
  setNotDraggable: () => void;
}

export function Course({ data, setDraggable, setNotDraggable }: ICourseProps) {
  const { setModalOpen, setModalPosition, setModalType, setLoaderActive, setEditCourseId } = useActions();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const [restoreCourse] = useRestoreCourseMutation();
  const navigate = useNavigate();


  const courseProgressStyles = css`
    margin-right: 20px;
  `;

  const courseTitleStyles = css`
    margin-right: ${IS_MOBILE ? 0 : "20px"};
    cursor: pointer;
  `;

  const dndBtnStyles = css`
    margin-right: 15px;
  `;

  const handleSelectCourse = () => {
    setModalOpen(false);
    navigate(`/courses/${data.id}`);
  };
  
  /*TODO: при изменении курса в форму прокидывается не та дата, 
  т.к. раньше изменять модно было только выбранный курс*/
  const handleEditCourse = () => {
    if (!data.id) {
      console.error(`No course with id: ${data.id}!`);
      return;
    }
    setEditCourseId(data.id);
    setModalType(MODAL_TYPES.editCourse);
    setModalPosition(ModalPosition.right);
    setModalOpen(true);
  };

  const handleToggleCourseStatus = () => {
    if (!data.id) {
      console.error(`No course with id: ${data.id}!`);
      return;
    }
    updateCourse({
      id: data.id,
      status: Number(data.status) === 0 ? 1 : 0,
      image: data.image,
    }).then((res) => {
      if ('data' in res) {
        // setCourseData(res.data.data);
      }
    });
    setLoaderActive(true);
  };

  const handleDeleteCourse = () => {
    deleteCourse({
      id: Number(data.id),
    }).then((res) => {
      if ('result' in res && !res.result) {
        alert('Что-то пошло не так...');
        console.error(`Course with id: ${data.id} not found!`);
      }
    });
    setLoaderActive(true);
  };

  const handleRestoreCourse = () => {
    restoreCourse({
      id: Number(data.id),
    }).then((res) => {
      if ('result' in res && !res.result) {
        alert('Что-то пошло не так...');
        console.error(`Course with id: ${data.id} not found!`);
      }
    });
    setLoaderActive(true);
  };

  return (
    <S.CourseWrapper onClick={handleSelectCourse}>
      <DndBtn
        styles={dndBtnStyles}
        onMouseEnter={setDraggable}
        onMouseLeave={setNotDraggable}
      />
      <CourseProgress
        styles={courseProgressStyles}
        percentage={data.percentage?.percentage || 0}
        isHidden={!data.status || !!data.is_deleted}
      />
      <CourseTitle
        styles={courseTitleStyles}
        title={data.title}
        isDeleted={!!data.is_deleted}
        isHidden={!data.status}
      />
      <AdminBtn
        type={ADMIN_BTN_TYPES.edit}
        popupName={'Курс'}
        styles={{ marginLeft: 'auto' }}
        popupHandlers={{
          onEdit: handleEditCourse,
          onHide: data.status ? handleToggleCourseStatus : undefined,
          onVisible: !data.status ? handleToggleCourseStatus : undefined,
          onDelete: !data.is_deleted ? handleDeleteCourse : undefined,
          onRestore: data.is_deleted ? handleRestoreCourse : undefined,
        }}
      />
    </S.CourseWrapper>
  );
}
