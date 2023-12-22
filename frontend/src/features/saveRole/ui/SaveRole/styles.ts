import styled, { css } from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import saveIcon from '@assets/images/save-white.svg';

export const Container = styled.div<{ $step: 1 | 2 }>`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br};
  ${(props) => {
    if (props.$step === 1) {
      return css`
        width: 572px;
      `;
    }
    if (props.$step === 2) {
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
  z-index: ${(props) => props.theme.utils.zIndex.darkOverlay};
`;

export const ButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const CloseBtn = styled.button`
  padding: 0;
  border: 0;
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  color: ${(props) => props.theme.colors.grey93};
  background-color: transparent;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.yRed};
  }
`;

export const SaveBtn = styled(C.DefaultBtn)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0 30px;
`;

export const SaveIcon = styled(C.Icon)`
  margin-right: 3px;
  background-image: url(${saveIcon});
`;
