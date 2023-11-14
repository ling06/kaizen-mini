import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  padding: 60px 0 90px 0;
  @media ${(props) => props.theme.media.mobile} {
    padding: 5vw 0 0 ;

  }
`;

export const MainInfoWrapper = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 35px;

  @media ${props => props.theme.media.mobile} {
    flex-direction: column;
    align-items: unset;
    justify-content: unset;
    row-gap: 2vw;
  }
`;
