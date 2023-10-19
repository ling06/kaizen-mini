import { ADMIN_BTN_TYPES, MODAL_TYPES } from "@/constants";
import * as S from "./styles";
import { useActions } from "@/hooks/useActions";
import { CustomSelect, IOption } from "../CustomSelect";
import { ICourse } from "@/types/course.types";
import { SingleValue } from "react-select";
import { AdminBtn } from "../AdminBtn";
import { CustomSelectOpions } from "../CustomSelectOpions/CustomSelectOpions";

interface ICourseSelectProps {
  data: Array<ICourse>;
}

export function CourseSelect({ data }: ICourseSelectProps) {
  const { setModalOpen, setModalType, setCourseData } = useActions();
  const selectOptions = data.map((course) => {
    return {
      value: course.id,
      // label: `Курс: ${course.title}`,
      label: <CustomSelectOpions text={course.title} percentage={0} />,
    };
  });

  const openCreateCourseModal = () => {
    setModalType(MODAL_TYPES.createCourse);
    setModalOpen(true);
  };

  const handleChange = (option: SingleValue<IOption>) => {
    if (!option) return;
    const activeCourseData = data.find((course) => course.id === option.value);
    setCourseData(activeCourseData);
  };

  return (
    <S.Container>
      <CustomSelect
        onChange={handleChange}
        options={selectOptions}
        defaultValue={selectOptions[0]}
      />
      <AdminBtn type={ADMIN_BTN_TYPES.add} onClick={openCreateCourseModal} />
    </S.Container>
  );
}
