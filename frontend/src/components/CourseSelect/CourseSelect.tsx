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
import { CourseCustomSelect } from '../CourseCustomSelect';
import { useEffect, useMemo, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

let init = true;

export function CourseSelect() {
  const coursesData = useTypedSelector((state) => selectCourses(state).data?.data);
  const { setModalOpen, setModalType, setCourseData, setLoaderActive } = useActions();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const [restoreCourse] = useRestoreCourseMutation();
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
      image: courseData.image,
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

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCourseId = event.target.value;
    setSelectedValue(`${selectedCourseId}`);
    navigate(`/courses/${selectedCourseId}`);
  };

  return (
    <S.Container>
      <CourseCustomSelect
        options={selectOptions}
        value={selectedValue}
        onChange={handleChange}
      />
      <AdminBtn
        popupName="Курс"
        type={ADMIN_BTN_TYPES.edit}
        onClick={() => {}}
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
