import styled, { css } from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

export const Container = styled.div<{$step: 1 | 2;}>`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: ${props => props.theme.colors.realWhite};
  border-radius: ${props => props.theme.utils.br};
  ${props => {
    if (props.$step === 1) {
      return css`
        width: 572px;
      `;
    }
    if(props.$step === 2) {
      return css`
        width: 700px;
      `;
    } 
  }}
`;

export const Overlay = styled(C.DarkOverlay)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${props => props.theme.utils.zIndex.darkOverlay};
`; 

