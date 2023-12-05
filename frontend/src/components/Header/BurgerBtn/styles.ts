import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import burgerIconOpen from '@assets/images/burger-icon-open.svg';
import burgerIconClose from '@assets/images/burger-icon-close.svg';

export const Button = styled.button`
  display: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  width: fit-content;
  @media ${(props) => props.theme.media.mobile} {
    display: block;
  }
`;

export const OpenIcon = styled(C.Icon)`
  width: 7.5vw;
  height: 7.5vw;
  background-image: url(${burgerIconOpen});
`;

export const CloseIcon = styled(OpenIcon)`
  background-image: url(${burgerIconClose});
`;
