import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/constants';
import * as S from './styles';
import { useActions } from '@/hooks/useActions';
import { AdminBtn } from '../AdminBtn';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectCourses, useUpdateCourseMutation } from '@/store/api/course.api';
import { CourseCustomSelect } from '../CourseCustomSelect';
import { useEffect, useMemo, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

let init = true;

export function CourseSelect() {
  const coursesData = useTypedSelector((state) => selectCourses(state).data?.data);
  const { setModalOpen, setModalType, setCourseData, setLoaderActive } = useActions();
  const [updateCourse] = useUpdateCourseMutation();
  const courseData = useTypedSelector((state) => state.course.data);
  const [selectedValue, setSelectedValue] = useState('');

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
        },
      };
    });
    return options;
  }, [coursesData]);

  useEffect(() => {
    if(selectOptions.length > 0 && init) {
      init = false;
      setSelectedValue(selectOptions[0].value);
    }
  }, [selectOptions])

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
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCourseId = event.target.value;
    setSelectedValue(`${selectedCourseId}`);
    const selectedCourseData = coursesData?.find((course) => `${course.id}` === `${selectedCourseId}`);
    if (selectedCourseData) {
      setCourseData(selectedCourseData);
    }
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
          onHide: Number(courseData.status)  === 1 ? handleToggleCourseStatus : undefined,
          onVisible: Number(courseData.status)  === 0 ? handleToggleCourseStatus : undefined,
        }}
      />
    </S.Container>
  );
}
