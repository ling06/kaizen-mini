import { AdminBtn } from "@/components/AdminBtn";
import { useGetNewsByIdQuery, } from '@/store/api/news.api';
import * as S from "./styles";
import { BackBtn } from '@/components/BackBtn';
import * as C from "@styles/components";
import { NewsByIdContent } from "@/components/NewsByIdContent";
import { useNavigate, useParams } from "react-router-dom";

export function NewsById() {
  const navigate = useNavigate();
  const handleCreateNews = () => {
    navigate("/news/create-news");
  };
  const { newsId } = useParams();
  const { data, isFetching, isError } = useGetNewsByIdQuery(Number(newsId), {
    skip: !newsId,
  });

  function handleGoBack (){

  }
  
  return (
    <C.DefaultContainer>
      <S.Container>
        <BackBtn onClick={handleGoBack} text={data?.data.title} />

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
