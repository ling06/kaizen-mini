import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

export const Container = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled(C.Text)`
  max-width: 268px;
  font-size: 37.778px;
  @media ${(props) => props.theme.media.mobile} {
    max-width: 50%;
    font-size: 6.13vw;
  }
`;

export const Percentage = styled.h3`
  font-size: 105.387px;
  font-weight: 700;
  line-height: 100%;
  color: ${(props) => props.theme.colors.mainBlue};
  @media ${(props) => props.theme.media.mobile} {
    font-size: 17.09vw;
    line-height: 113%;
  }
`;
