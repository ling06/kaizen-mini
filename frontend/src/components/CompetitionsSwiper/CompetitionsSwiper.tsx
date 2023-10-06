import * as S from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Competition } from '../Competition';
import { useCallback, useRef } from 'react';

export function CompetitionsSwiper() {
  const swiperRef = useRef(null);

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
      <Swiper
        ref={swiperRef}
        style={{ width: '100%', height: '100%' }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}>
        <SwiperSlide>
          <Competition />
        </SwiperSlide>
        <SwiperSlide>
          <Competition />
        </SwiperSlide>
        <SwiperSlide>
          <Competition />
        </SwiperSlide>
      </Swiper>
      <S.SwiperPrevBtn onClick={handlePrev} />
      <S.SwiperNextBtn onClick={handleNext} />
    </S.Container>
  );
}
