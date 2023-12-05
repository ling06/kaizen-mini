import {
  useGetAllNewsQuery,
  useGetNewsByCategoryQuery,
} from "@/store/api/news.api";
import { AdminBtn } from "../AdminBtn";
import { NewsEl } from "../NewsEl";
import * as S from "./styles";
import { NewsCategoryWrapper } from "../NewsCategoryWrapper";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ErrorBlock } from "../ErrorBlock";
import { useActions } from "@/shared/lib/hooks/useActions";
import { useEffect, useState } from "react";
import { LoadingSmall } from "../LoadingSmall";
import { NoAvailable } from "../NoAvailable";
import { useGetNewsCategoryQuery } from '@/store/api/newsCategory.api';
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery";
import { MediaQueries } from "@/shared/constants";
import { NewsCategoryDropPopup } from "@/components/NewsCategoryDropPopup";


export function NewsContainer() {
  const navigate = useNavigate();
  const { setLoaderActive } = useActions();
  const [searchParams] = useSearchParams();
  const [categorySearchParam, setCategorySearchParam] = useState<null | string>(
    null
  );
  const { data, isError, isFetching } = useGetAllNewsQuery(undefined, {
    skip: !!categorySearchParam,
  });

  const isMobile = useMediaQuery(MediaQueries.mobile);
  const newsByIdData  = useGetNewsCategoryQuery();

  const newsByCategory = useGetNewsByCategoryQuery(
    Number(categorySearchParam),
    {
      skip: !categorySearchParam,
    }
  );

  useEffect(() => {
    setCategorySearchParam(searchParams.get("category"));
  }, [searchParams]);

  useEffect(() => {
    setLoaderActive(isFetching);
  }, [isFetching, setLoaderActive]);

 
  const handleCreateNews = () => {
    navigate("/news/create-news");
  };

  return (
    <S.Container>
      <S.Title>
        Новости
        <AdminBtn popupName="Новость" type="add" onClick={handleCreateNews} />
      </S.Title>
      {isMobile ? (
        <NewsCategoryDropPopup NewsCategory={newsByIdData} />
      ): null}
      <S.ContentWrapper>
        <NewsCategoryWrapper />
        <S.News>
          {isFetching || (newsByCategory.isFetching && <LoadingSmall />)}
          {isError && <ErrorBlock />}
          {categorySearchParam &&
            newsByCategory.data &&
            newsByCategory.data.data.length > 0 &&
            newsByCategory.data.data.map((newsData) => (
              <NewsEl data={newsData} />
            ))}
          {!categorySearchParam &&
            data &&
            data.data.length > 0 &&
            data.data
              .slice()
              .reverse()
              .map((newsData) => <NewsEl data={newsData} />)}
          {!newsByCategory.data?.data.length &&
            !data?.data.length &&
            !isFetching &&
            !newsByCategory.isFetching && (
              <NoAvailable
                text="Нет доступных новостей"
                onAdd={handleCreateNews}
              />
            )}
        </S.News>
      </S.ContentWrapper>
    </S.Container>
  );
}
