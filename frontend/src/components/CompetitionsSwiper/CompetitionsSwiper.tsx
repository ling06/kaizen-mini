import * as S from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Competition } from '../Competition';
import { useCallback, useRef } from 'react';
import { ICompetition, IGetAllCompetitions } from '@/types/competition.types';
import { useNavigate } from 'react-router-dom';
import { LoadingSmall } from '../LoadingSmall';
import { ErrorBlock } from '../ErrorBlock';

interface ICompetitionsSwiperProps {
  data?: IGetAllCompetitions;
  isError?: boolean;
  isFetching?: boolean;
}

export function CompetitionsSwiper({ data, isError, isFetching }: ICompetitionsSwiperProps) {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const handleClickCreateCompetition = () => {
    navigate('/competition/create-competition');
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
          <Swiper
            ref={swiperRef}
            style={{ width: '100%', height: '100%' }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            modules={[Autoplay]}>
            {!data?.data?.length && <S.SwiperCreateBtn onClick={handleClickCreateCompetition}>Добавить</S.SwiperCreateBtn>}
            {data?.data?.length > 0 &&
              data?.data?.map((competitionData: ICompetition, index: number) => (
                <SwiperSlide key={competitionData?.id}>
                  <Competition
                    data={competitionData}
                    totalCount={data?.count}
                    index={index}
                  />
                </SwiperSlide>
              ))}
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
