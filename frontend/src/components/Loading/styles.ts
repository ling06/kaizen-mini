import styled from 'styled-components';
import * as C from '@styles/components';

export const Overlay = styled(C.FlexContainer)`
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: 0.3s ease-out 0s 1 normal forwards overlayEntrance;

  @keyframes overlayEntrance {
    100% {
      opacity: 1;
    }
  }
`;

export const Container = styled(C.FlexContainer)`
  align-items: center;
  width: fit-content;
  padding: 18px 24px;
  border-radius: ${props => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.realWhite};
`;

export const Logo = styled.img`
  width: 30px;
  margin-right: 15px;
`;

export const Text = styled(C.Text)`
  font-size: 22.714px;
`;
