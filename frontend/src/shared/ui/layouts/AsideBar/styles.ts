import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  width: 25%;
  @media ${(props) => props.theme.media.mobile} {
    width: 100%;
  }
`;
