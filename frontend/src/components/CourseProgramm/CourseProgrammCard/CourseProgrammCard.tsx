import * as S from './styles';
import defaultCardImg from '@assets/images/stub-course-program.webp';
import { IChapter } from '@/shared/model/types/chapter.types';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Progress } from '../Progress';

interface ICourseProgrammCard {
  data: IChapter;
  setDraggable: () => void;
  setNotDraggable: () => void;
}

export function CourseProgrammCard({ data, setDraggable, setNotDraggable }: ICourseProgrammCard) {
  const navigation = useNavigate();
  const [isDeleted, setDeleted] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (data.image) {
      const src = data.image.directory + '/' + data.image.name;
      setImgSrc(src);
    }
  }, [data.image]);

  useEffect(() => {
    Number(data.is_deleted) === 0 ? setDeleted(false) : setDeleted(true);
  }, [data.is_deleted]);

  const handleClick = () => {
    navigation(`/courses/${data.course_id}/${data.id}/`);
  };

  const setDeletedChapter = (arg: boolean) => {
    setDeleted(arg);
  }

  return (
    <S.Card $isDeleted={isDeleted}>
      <S.imgWrapper onClick={handleClick}>
        <S.Img src={imgSrc || defaultCardImg} />
      </S.imgWrapper>
      <S.Title>{data.title}</S.Title>
      <Progress
        setDeleted={setDeletedChapter}
        data={data}
        setDraggable={setDraggable}
        setNotDraggable={setNotDraggable}
        isDeleted={isDeleted}
      />
    </S.Card>
  );
}
