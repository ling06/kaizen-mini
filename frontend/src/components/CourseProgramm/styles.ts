import * as C from '@/shared/ui/assets/styles/components';
import styled from 'styled-components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
`;

export const Head = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  @media ${(props) => props.theme.media.mobile} {
    padding: 0 3.125vw;
    margin-bottom: 4.6875vw;
    font-size: 4.6875vw;
  }
`;

export const Title = styled(C.Text)`
  @media ${(props) => props.theme.media.mobile} {
    margin: 0 auto;
    font-size: 4.6875vw;
  }
`;

export const CardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  gap: 9px;
  @media ${(props) => props.theme.media.mobile} {
    justify-content: space-between;
    gap: unset;
    row-gap: 1.875vw;
  }
`;
