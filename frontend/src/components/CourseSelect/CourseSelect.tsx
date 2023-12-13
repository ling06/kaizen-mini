import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/constants';
import * as S from './styles';
import { useActions } from '@/hooks/useActions';
import { AdminBtn } from '../AdminBtn';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
  selectCourses,
  useDeleteCourseMutation,
  useRestoreCourseMutation,
  useUpdateCourseMutation,
} from '@/store/api/course.api';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseTitle } from '../CourseTitle';
import { CourseProgress } from '../CourseProgress';
import { css } from 'styled-components';
import { ModalPosition } from '@/types/common.types';

let init = true;

export function CourseSelect() {
  const coursesData = useTypedSelector((state) => selectCourses(state).data?.data);
  const { setModalOpen, setModalType, setCourseData, setLoaderActive, setModalPosition } =
    useActions();
  const [updateCourse] = useUpdateCourseMutation();

  const courseData = useTypedSelector((state) => state.course.data);
  const [selectedValue, setSelectedValue] = useState('');
  const navigate = useNavigate();

  const selectOptions = useMemo(() => {
    if (!coursesData) {
      return [];
    }
    const options = coursesData.map((course) => {
      return {
        value: `${course.id}`,
        label: course.title,
        data: {
          status: Number(course.status),
          title: course.title,
          percentage: course.percentage?.percentage || 0,
          isDeleted: !!course.is_deleted,
        },
      };
    });
    return options;
  }, [coursesData]);

  useEffect(() => {
    if (selectOptions.length > 0 && init) {
      init = false;
      setSelectedValue(selectOptions[0].value);
    } else if (selectOptions.length > 0) {
      const selectedCourseData = selectOptions.find(
        (option) => Number(option.value) === Number(courseData.id)
      );
      if (!selectedCourseData) {
        return;
      }
      setSelectedValue(selectedCourseData?.value);
    }
  }, [courseData.id, selectOptions]);


  const marginRight = css`
    margin-right: 20px;
  `;

  const handleOpenSelectCourseModal = () => {
    setModalType(MODAL_TYPES.selectCourse);
    setModalOpen(true);
    setModalPosition(ModalPosition.left);
  };

  const handleCreateCourse = () => {
    setModalOpen(true);
    setModalType('createCourse');
  };


  return (
    <S.Container>
      <S.CourseName onClick={handleOpenSelectCourseModal}>
        <CourseProgress
          percentage={courseData.percentage?.percentage || 0}
          styles={marginRight}
          isHidden={!courseData.status || !!courseData.is_deleted}
        />
        <CourseTitle
          title={courseData.title}
          isSelected={true}
          styles={marginRight}
          isDeleted={!!courseData.is_deleted}
          isHidden={!courseData.status}
        />
        <S.SelectIcon />
      </S.CourseName>
      <AdminBtn
        popupName="Курс"
        type={ADMIN_BTN_TYPES.add}
        onClick={handleCreateCourse}
      />
    </S.Container>
  );
}
