import { useGetCoursesQuery } from '@/store/api/course.api';
import { SortableList } from './SortableList';
import * as S from './styles';
import { useEffect, useState } from 'react';
import { ErrorBlock } from '../ErrorBlock';
import { LoadingSmall } from '../LoadingSmall';
import { useActions } from '@/shared/lib/hooks/useActions';
import { ICourse } from '@/shared/model/types/course.types';

export function SelectCourseForm() {
  const {setModalOpen} = useActions();
  const { data, isFetching, isLoading, isError } = useGetCoursesQuery();
  const [coursesData, setCoursesData] = useState<Array<ICourse>>([]);

  useEffect(() => {
    if (data && !isFetching && !isError) {
      setCoursesData(data.data);
    } else {
      setCoursesData([]);
    }
  }, [data, isError, isFetching]);

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  return (
    <>
      <S.Container>
        {isError && !isLoading && !isFetching && <ErrorBlock />}
        {(isLoading || isFetching) && (
          <S.LoadingContainer>
            <LoadingSmall />
          </S.LoadingContainer>
        )}
        {coursesData.length > 0 && !isError && !isLoading && <SortableList data={coursesData} />}
      </S.Container>
      <S.CloseBtn onClick={handleCloseModal}>
        Отмена
      </S.CloseBtn>
    </>
  );
}
