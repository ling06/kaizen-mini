import { Link, useNavigate, useParams } from "react-router-dom";
import * as S from "./styles";
import {
  useDeleteCompetitionMutation,
  useGetAllCompetitionsQuery,
  useGetCompetitionByIdQuery,
  useRestoreCompetitionMutation,
  useUpdateCompetitionMutation,
} from "@/store/api/competition.api";
import { ContentTitle } from "../ContentTitle";
import { LoadingSmall } from "../LoadingSmall";
import { CkEditorOutput } from "../CkEditorOutput";
import { ErrorBlock } from "../ErrorBlock";
// import { useEditorOutput } from '@/hooks/useEditorOutput';
// import { IEditorJsData } from '@/types/editorJs.types';
// import { useState, useEffect } from 'react';
import { NewsRequisites } from "../NewsRequisites";
import { useActions } from "@/shared/lib/hooks/useActions";
import { MediaQueries } from "@/shared/constants";
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { Content } from "@/layouts/Content";

export function CompetitionContent() {
  const { setLoaderActive } = useActions();
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const [deleteCompetition] = useDeleteCompetitionMutation();
  const [restoreCompetition] = useRestoreCompetitionMutation();
  const [updateCompetition] = useUpdateCompetitionMutation();
  const { data, isFetching, isError } = useGetCompetitionByIdQuery(
    Number(competitionId),
    {
      skip: !competitionId,
    }
  );
  const [isAllCompetitionsLenght, setAllCompetitionsLenght] = useState("");
  const allCompetitions = useGetAllCompetitionsQuery();

  const handleEditTextCompetitionLenght = () => [
    setAllCompetitionsLenght(
      "Конкурс " +
        `${data?.data.id === undefined ? "1" : data?.data.id}` +
        "/" +
        `${
          allCompetitions.data?.data.length === undefined
            ? "1"
            : allCompetitions.data?.data.length
        }`
    ),
  ];

  useEffect(() => {
    handleEditTextCompetitionLenght();
  }, [data, allCompetitions.data?.data.length]);

  // const [editorData, setEditorData] = useState<Array<IEditorJsData>>([]);
  // const editorOutput = useEditorOutput(editorData);
  const isMobile = useMediaQuery(MediaQueries.mobile);

  const handleEditCompetition = () => {
    if (!data) {
      console.error("No data:", data);
      return;
    }
    navigate(`/news/competition/edit-competition/${data?.data.id}`);
  };

  const handleDeleteCompetition = () => {
    if (!data) {
      console.error("No data:", data);
      return;
    }
    deleteCompetition({ id: data.data.id }).then(() => {
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  const handleRestoreCompetition = () => {
    if (!data) {
      console.error("No data:", data);
      return;
    }
    restoreCompetition({ id: data.data.id }).then(() => {
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  const handleVisibleCompetition = () => {
    if (!data) {
      console.error("No data:", data);
      return;
    }
    updateCompetition({
      id: data.data.id,
      status: Number(data.data.status) === 0 ? 1 : 0,
    })
      .then((res) => {
        if ("data" in res && !res.data.result) {
          alert("При редактировании конкурса произошла ошибка");
        }
        setLoaderActive(false);
      })
      .catch((err) => {
        console.error(err);
        alert("При редактировании конкурса произошла ошибка");
        setLoaderActive(false);
      });
    setLoaderActive(true);
  };
  const handleNextCompetition = () => {
    if (
      (data?.data.id as number) < (allCompetitions.data?.data.length as number)
    ) {
      navigate(`/news/competitions/${(data?.data.id as number) + 1}`);
    } else if (
      (data?.data.id as number) == (allCompetitions.data?.data.length as number)
    ) {
      navigate(`/news/competitions/${1}`);
    }
  };

  const handleBackCompetition = () => {
    if ((data?.data.id as number) !== 1) {
      navigate(`/news/competitions/${(data?.data.id as number) - 1}`);
    } else if ((data?.data.id as number) == 1) {
      navigate(`/news/competitions/${allCompetitions.data?.data.length}`);
    }
  };

  return (
    <>
      {isMobile ? (
        <S.AllCompetitionsLenght>
          {isAllCompetitionsLenght}
        </S.AllCompetitionsLenght>
      ) : null}
      <Content
        isDeleted={!!data?.data.is_deleted}
        isVisible={Number(data?.data.status) === 1}
      >
        {!isMobile ? (
          <S.AllCompetitionsLenght>
            {isAllCompetitionsLenght}
          </S.AllCompetitionsLenght>
        ) : null}
        {data && !isError && !isFetching && (
          <>
            <ContentTitle title={data?.data.title} />
            {/* <S.EditorOutputContainer>{editorOutput}</S.EditorOutputContainer> */}
            <CkEditorOutput data={data.data.text} />
            {/* <div dangerouslySetInnerHTML={{__html: data.data.text}} className="ck-content"/> */}

            <S.BottomContainer>
              <Link
                to={data.data.link}
                target="_blank"
                style={{
                  textDecoration: "none",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                {data.data.link && (
                  <S.Link>
                    Еще подробнее
                    <S.LinkIcon />
                  </S.Link>
                )}
              </Link>
              <NewsRequisites
                date={data.data.date}
                author={data.data.user?.name || data.data.user_id}
                adminHandlers={{
                  onDelete: data.data.is_deleted
                    ? undefined
                    : handleDeleteCompetition,
                  onRestore: data.data.is_deleted
                    ? handleRestoreCompetition
                    : undefined,
                  onEdit: handleEditCompetition,
                  onHide:
                    Number(data.data.status) === 1
                      ? handleVisibleCompetition
                      : undefined,
                  onVisible:
                    Number(data.data.status) === 0
                      ? handleVisibleCompetition
                      : undefined,
                }}
              />
            </S.BottomContainer>
          </>
        )}
        {isFetching && <LoadingSmall />}
        {isError && <ErrorBlock />}
        <S.ContainerBtn>
          <S.BtnLeft onClick={handleBackCompetition} />
          <S.BtnRight onClick={handleNextCompetition} />
        </S.ContainerBtn>
      </Content>
    </>
  );
}
