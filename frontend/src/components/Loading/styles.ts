import styled from 'styled-components';
import * as C from '@styles/components';

interface IOverlay {
  $state: string;
}

export const Overlay = styled(C.FlexContainer)<IOverlay>`
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: ${(props) => props.theme.utils.zIndex.loading};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: ${props => props.$state === 'exited' || props.$state === 'exiting' ? 0 : 1};
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity .2s ease-in-out;
`;

export const Container = styled(C.FlexContainer)`
  align-items: center;
  width: fit-content;
  padding: 18px 24px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.realWhite};
`;

export const Logo = styled.img`
  width: 30px;
  margin-right: 15px;
`;

export const Text = styled(C.Text)`
  font-size: 22.714px;
`;
