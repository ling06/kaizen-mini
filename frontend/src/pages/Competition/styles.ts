import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  padding-top: 50px;
  @media ${(props) => props.theme.media.mobile} {
    flex-direction: column;
    padding-top: 4.6875vw;
  }
`;
