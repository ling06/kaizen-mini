import * as S from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { Competition } from "../Competition";
import { useCallback, useRef } from "react";
import { ICompetition, IGetAllCompetitions } from "@/types/competition.types";
import { useNavigate } from "react-router-dom";
import { LoadingSmall } from "../LoadingSmall";
import { ErrorBlock } from "../ErrorBlock";
import { NoAvailable } from "../NoAvailable";

interface ICompetitionsSwiperProps {
  data?: IGetAllCompetitions;
  isError?: boolean;
  isFetching?: boolean;
}

export function CompetitionsSwiper({
  data,
  isError,
  isFetching,
}: ICompetitionsSwiperProps) {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const handleCreateCompetition = () => {
    navigate(`/news/competition/create-competition`);
  };

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    swiperRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    swiperRef.current.swiper.slideNext();
  }, []);

  return (
    <S.Container>
      {isFetching && <LoadingSmall />}
      {isError && !isFetching && <ErrorBlock />}
      {data && !isError && !isFetching && (
        <>
          {!data.data.length && !isFetching && (
            <NoAvailable
              text="Нет доступных конкурсов"
              onAdd={handleCreateCompetition}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                zIndex: "2",
              }}
            />
          )}
          <Swiper
            ref={swiperRef}
            style={{ width: "100%", height: "100%" , overflow: "unset", position: "relative"}}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              767: {
                slidesPerView: 1,
              },
              320: {
                slidesPerView: 1.2,
                centeredSlides: true,
                spaceBetween: 15,
              },
            }}
            loop={true}
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true ,}}
          >
            {data?.data?.length > 0 &&
              data?.data?.map(
                (competitionData: ICompetition, index: number) => (
                  <SwiperSlide key={competitionData?.id}>
                    <Competition
                      data={competitionData}
                      totalCount={data?.count}
                      index={index}
                    />
                  </SwiperSlide>
                )
              )}
          </Swiper>
          {data?.data?.length > 1 && (
            <>
              <S.SwiperPrevBtn onClick={handlePrev} />
              <S.SwiperNextBtn onClick={handleNext} />
            </>
          )}
        </>
      )}
    </S.Container>
  );
}
