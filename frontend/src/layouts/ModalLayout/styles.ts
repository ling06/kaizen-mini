import styled from 'styled-components';

export const ModalLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  animation: overlayEntrance 0.3s ease-out forwards;

  @keyframes overlayEntrance {
    100% {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export const Window = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: fit-content;
  height: 100%;
  background-color: ${(props) => props.theme.colors.realWhite};
  animation: windowEntrance 0.3s ease-out forwards;

  @keyframes windowEntrance {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translate(0%);
    }
  }
`;

export const ModalName = styled.h3`
  position: absolute;
  top: 35px;
  left: -155px;
  font-size: 92.5px;
  font-weight: 700;
  line-height: 120%;
  color: ${(props) => props.theme.colors.realWhite};
  transform: rotate(-180deg);
  writing-mode: vertical-lr;
  pointer-events: none;
`;
