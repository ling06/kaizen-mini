import { AdminBtn } from "@/components/AdminBtn";
import { useGetNewsByIdQuery } from "@/store/api/news.api";
import * as S from "./styles";
import { BackBtn } from "@/components/BackBtn";
import * as C from "@/shared/ui/assets/styles/components";
import { NewsByIdContent } from "@/components/NewsByIdContent";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery";
import { MediaQueries } from "@/shared/model/constants";

export function NewsById() {
  const navigate = useNavigate();
  const handleCreateNews = () => {
    navigate("/news/create-news");
  };
  const { newsId } = useParams();
  const { data, isFetching, isError } = useGetNewsByIdQuery(Number(newsId), {
    skip: !newsId,
  });

  const isMobile = useMediaQuery(MediaQueries.mobile);

  function handleGoBack() {
    navigate("/news", { replace: true });
  }

  return (
    <C.DefaultContainer>
      <S.Container>
        {isMobile ? (
          <BackBtn onClick={handleGoBack} text={data?.data.title} />
        ) : null}

        <AdminBtn
          popupName="Новость"
          type="add"
          styles={{ marginLeft: "auto" }}
          onClick={handleCreateNews}
        />
        <NewsByIdContent />
      </S.Container>
    </C.DefaultContainer>
  );
}
