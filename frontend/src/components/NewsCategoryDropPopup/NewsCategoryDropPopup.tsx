import { log } from "console";
import * as S from "./styles";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface INewsCategoryProps {
  NewsCategory: object;
}

export function NewsCategoryDropPopup({ NewsCategory }: INewsCategoryProps) {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState<boolean>(false);
  const { data, isError, isLoading } = NewsCategory as {
    data: object;
    isError: boolean;
    isLoading: boolean;
  };
  const handleToglePopupCategories = () => {
    setOpen((prevState) => !prevState);
  };
  const [isTextNewsCategory, setTextNewsCategory] = useState("Все новости");
  const updateText = (text: string) => {
    setTextNewsCategory(text);
  };
  const popupRef = useRef<HTMLDivElement>(null);
  const currentURL = window.location.href;

  const handleOutsideClick = (event: TouchEvent) => {
    console.log(popupRef.current);
    // console.log(!popupRef.current.contains(event.target as Node));

    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      console.log(343434);

      setOpen(false);
    }
  };

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => handleOutsideClick(event);
    document.addEventListener("touchstart", handleTouchStart);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const handleGoToCategory = (id: number, text: string) => {
    navigate(`/news?category=${id}`);

    updateText(text);
    setOpen(false);
  };

  const handleGoToAllNews = () => {
    navigate("/news", { replace: true });
    updateText("Все новости");
    setOpen(false);
  };

  return (
    <>
      <S.dropMenu>
        <S.titleFilter onClick={handleToglePopupCategories}>
          {isTextNewsCategory}
        </S.titleFilter>
        <S.dropMenuImg
          ref={popupRef}
          style={{
            transition: "transform .2s ease",
            transform: `rotate(${isOpen ? "180deg" : "0"})`,
          }}
        />
        <S.filterPopup style={{ display: isOpen ? "flex" : "none" }}>
          {currentURL !== `http://kaizen-mini.borboza.com/news` ? (
            <S.titleFilter onClick={handleGoToAllNews}>
              Все новости
            </S.titleFilter>
          ) : null}
          {!isError &&
            !isLoading &&
            data &&
            data.data.map((newsCategory: any) => (
              <S.titleFilter
                onClick={() =>
                  handleGoToCategory(newsCategory.id, newsCategory.title)
                }
                key={newsCategory.id}
              >
                {newsCategory.title}
              </S.titleFilter>
            ))}
        </S.filterPopup>
      </S.dropMenu>
    </>
  );
}
