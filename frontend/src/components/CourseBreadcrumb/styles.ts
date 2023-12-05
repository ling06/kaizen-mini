import styled, { css } from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import arrowRight from '@assets/images/arrowRight.svg';

export const Container = styled(C.FlexContainer)`
  align-items: center;
  column-gap: 7px;
  flex-wrap: wrap;
  @media ${(props) => props.theme.media.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TextStyle = css`
  font-size: 15px;
  font-weight: 500;
  line-height: 130%;
  color: ${(props) => props.theme.colors.realBlack};
  @media ${(props) => props.theme.media.mobile} {
    font-size: 3.75vw;
  }

  &:not(:last-child) {
    @media ${(props) => props.theme.media.mobile} {
      margin-bottom: 3.125vw;
    }
  }
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
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;
