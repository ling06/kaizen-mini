import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  position: relative;
  min-width: 956px;
  padding-top: 10px;
  padding-bottom: 20px;
  margin-bottom: auto;
`;

export const LoadingContainer = styled.div`
  position: relative;
  min-height: 200px;
`;

export const CloseBtn = styled(C.DefaultBtn)`
  width: 95%;
  margin: 0 auto 20px;
  background-color: ${(props) => props.theme.colors.greyF1};
  color: ${(props) => props.theme.colors.grey93};

  &:hover {
    background-color: ${(props) => props.theme.colors.greyEO};
  }
`;
