import styled, { css } from 'styled-components';
import * as C from '@styles/components';
import arrowRight from '@assets/images/arrowRight.svg';

export const Container = styled(C.FlexContainer)`
  align-items: center;
  column-gap: 7px;
  flex-wrap: wrap;
`;

const TextStyle = css`
  font-size: 15px;
  font-weight: 500;
  line-height: 130%;
  color: ${(props) => props.theme.colors.realBlack};
`;

export const Chapter = styled.p`
  ${TextStyle}
`;

export const Theme = styled.p`
  ${TextStyle}
`;

export const Lesson = styled.p`
  ${TextStyle}
`;

export const Arrow = styled(C.Icon)`
  background-image: url(${arrowRight});
`;
