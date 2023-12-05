import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import logo from '@assets/images/loadingLogo.svg';

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${(props) => props.theme.utils.zIndex.popup};
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: ${(props) => props.theme.colors.realWhite};
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`;

export const LoadingIcon = styled(C.Icon)`
  margin-right: 15px;
  background-image: url(${logo});
`;

export const LoadingText = styled(C.Text)`
  font-size: 22px;
`;
