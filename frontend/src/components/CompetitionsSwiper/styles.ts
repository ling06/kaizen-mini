import styled from 'styled-components';
import arrowLeft from '@assets/images/swiperArrowLeft.svg';
import * as C from '@styles/components';

export const Container = styled.div`
  position: relative;
  width: 49.7%;
  height: 400px;
  background-color: ${(props) => props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br};
  overflow: hidden;
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

export const SwiperCreateBtn = styled(C.DefaultBtn)`
  z-index: 2;
  position: absolute;
  top:50%;
  left:50%;
  color:white;
  border-radius:15px;
  width: fit-content;
  padding:20px 30px;
  background-color:rgb(0, 122, 255);
  cursor: pointer;
  transform: translate(-50%, -50%);
`;

export const Text = styled(C.Text)`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 22px;
  transform: translate(-50%, -50%);
  z-index: 2;
`;
