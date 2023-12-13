import styled, { css } from 'styled-components';
import closeIcon from '@assets/images/close-icon.svg';
import { ModalPosition } from '@/types/common.types';

interface IModalPosition {
  modalPosition: ModalPosition;
}

export const ModalLayout = styled.div<IModalPosition>`
  display: flex;
  justify-content: ${(props) => (props.modalPosition === 'left' ? 'flex-start' : 'flex-end')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  animation: overlayEntrance 0.3s ease-out forwards;
  z-index: ${(props) => props.theme.utils.zIndex.darkOverlay};
  @media ${(props) => props.theme.media.mobile} {
    animation: unset;
  }

  @keyframes overlayEntrance {
    100% {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export const Window = styled.div<IModalPosition>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: fit-content;
  height: 100%;
  /* overflow-y: auto; */
  background-color: ${(props) => props.theme.colors.realWhite};
  animation: ${props => props.modalPosition === ModalPosition.left ? 'windowEntranceLeft' : 'windowEntranceRight'} 0.3s ease-out forwards;
  @media ${(props) => props.theme.media.mobile} {
    width: 100%;
    padding: 3.125vw 0 0;
    animation-name: windowEntrance;
  }

  @keyframes windowEntranceRight {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translate(0%);
    }
  }

  @keyframes windowEntranceLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translate(0%);
    }
  }
`;

export const ModalName = styled.h3<IModalPosition>`
  position: absolute;
  top: 35px;
  font-size: 92.5px;
  font-weight: 700;
  line-height: 120%;
  color: ${(props) => props.theme.colors.realWhite};
  transform: rotate(-180deg);
  writing-mode: vertical-lr;
  pointer-events: none;
  ${(props) => {
    if (props.modalPosition === ModalPosition.left) {
      return css`
        right: -115px;
      `;
    }
    if (props.modalPosition === ModalPosition.right) {
      return css`
        left: -155px;
      `;
    }
  }}
  @media ${(props) => props.theme.media.mobile} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: static;
    padding: 0 3.125vw;
    margin-bottom: 4.6875vw;
    font-size: 3.75vw;
    color: ${(props) => props.theme.colors.mainBlue};
    transform: none;
    writing-mode: unset;
    pointer-events: unset;
  }
`;

export const CloseBtn = styled.button`
  display: none;
  @media ${(props) => props.theme.media.mobile} {
    display: block;
    width: 7.5vw;
    height: 7.5vw;
    padding: 0;
    margin: 0;
    background-color: transparent;
    background-image: url(${closeIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
`;
