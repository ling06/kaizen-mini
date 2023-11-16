import { AdminBtn } from "@/components/AdminBtn";
import * as S from "./styles";
import * as C from "@styles/components";
import defaultCardImg from "@assets/images/stub-course-program.webp";
import { ADMIN_BTN_TYPES, MODAL_TYPES } from "@/constants";
import { IChapter } from "@/types/chapter.types";
import { useNavigate } from "react-router-dom";
import {
  useDeleteChapterMutation,
  useRestoreChapterMutation,
} from "@/store/api/chapter.api";
import { useEffect, useState } from "react";
import { useActions } from "@/hooks/useActions";

interface ICourseProgrammCard {
  data: IChapter;
}

export function CourseProgrammCard({ data }: ICourseProgrammCard) {
  const navigation = useNavigate();
  const [deleteChapter] = useDeleteChapterMutation();
  const [restoreChapter] = useRestoreChapterMutation();
  const [isTextProgres, setTextProgres] = useState("");
  const [isDeleted, setDeleted] = useState<boolean>(false);
  const {
    setLoaderActive,
    setModalOpen,
    setModalType,
    setUpdatingChapterData,
  } = useActions();
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (data.image) {
      const src = data.image.directory + "/" + data.image.name;
      setImgSrc(src);
    }
  }, [data.image]);

  useEffect(() => {
    Number(data.is_deleted) === 0 ? setDeleted(false) : setDeleted(true);
  }, [data.is_deleted]);

  const handleClick = () => {
    navigation(`/courses/${data.course_id}/${data.id}/`);
  };

  useEffect(() => {
    changesStatusText();
  }, [data]);

  const handleDeleteChapter = () => {
    deleteChapter({ id: data.id }).then(() => {
      setLoaderActive(false);
      setDeleted(true);
    });
    setLoaderActive(true);
  };

  const handleRestoreChapter = () => {
    restoreChapter({ id: data.id }).then(() => {
      setLoaderActive(false);
      setDeleted(false);
    });
    setLoaderActive(true);
  };

  const handleEditChapter = () => {
    setModalType(MODAL_TYPES.editChapter);
    setUpdatingChapterData(data);
    setModalOpen(true);
  };

  const changesStatusText = () => {
    if (data.percentage.percentage == 100) {
      return setTextProgres("Пройдено");
    } else if (
      data.percentage.percentage > 0 &&
      data.percentage.percentage < 100
    ) {
      return setTextProgres("В процессе");
    } else if (data.percentage.percentage == 0) {
      return setTextProgres("Предстоит");
    }
  };

  return (
    <S.Card $isDeleted={isDeleted}>
      <S.imgWrapper onClick={handleClick}>
        <S.Img src={imgSrc || defaultCardImg} />
      </S.imgWrapper>
      <S.Title>{data.title}</S.Title>
      <S.ProgressContainer>
        <S.ProgressStatusWrapper>
          <S.ProgressStatus>{isTextProgres}</S.ProgressStatus>
          <AdminBtn
            popupName="Глава"
            type={ADMIN_BTN_TYPES.edit}
            onClick={() => {}}
            popupHandlers={{
              onDelete: isDeleted ? undefined : handleDeleteChapter,
              onRestore: isDeleted ? handleRestoreChapter : undefined,
              onEdit: handleEditChapter,
            }}
          />
        </S.ProgressStatusWrapper>
        <C.ProgressBar $progress={data?.percentage.percentage || 0} />
      </S.ProgressContainer>
    </S.Card>
  );
}
