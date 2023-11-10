import styled from 'styled-components';
import arrowLeft from '@assets/images/swiperArrowLeft.svg';

export const Container = styled.div`
  position: relative;
  width: 49.7%;
  height: 400px;
  padding: 25px;
  background-color: ${(props) => props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br};
  @media ${(props) => props.theme.media.mobile} {
    width: 100%;
  }
`;

export const SwiperPrevBtn = styled.div`
  position: absolute;
  bottom: 40px;
  left: 20px;
  z-index: 2;
  width: 33px;
  height: 33px;
  background-image: url(${arrowLeft});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  cursor: pointer;
`;

export const SwiperNextBtn = styled(SwiperPrevBtn)`
  right: 20px;
  left: unset;
  transform: rotate(-180deg);
`;

export const SwiperCreateBtn = styled.div`
  z-index: 2;
  position: absolute;
  top:0;
  right:0;
  color:white;
  border-radius:10%;
  width: fit-content;
  padding:20px;
  background-color:rgb(0, 122, 255);
  cursor: pointer;
`;
