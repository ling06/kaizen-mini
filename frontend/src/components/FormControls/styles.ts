import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 10px;
  width: 100%;
  padding: 25px;
`;

export const ConfirmBtn = styled(C.DefaultBtn)`
  width: 49%;
  min-width: 449px;
`;

export const CancelBtn = styled(ConfirmBtn)`
  color: ${(props) => props.theme.colors.grey93};
  background-color: ${(props) => props.theme.colors.greyF1};

  &:hover {
    background-color: ${(props) => props.theme.colors.greyEO};
  }
`;
