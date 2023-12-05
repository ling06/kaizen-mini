import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 10px;
  width: 100%;
  padding: 25px;
  margin-top: auto;
  border-top: 1px solid ${props => props.theme.colors.greyF1};
  @media ${(props) => props.theme.media.mobile} {
    flex-wrap: nowrap;
    padding: 3.125vw;
    gap: unset;
  }
`;

export const ConfirmBtn = styled(C.DefaultBtn)`
  width: 49%;
  min-width: 449px;
  @media ${(props) => props.theme.media.mobile} {
    min-width: unset;
    width: 48%;
    min-height: 15.625vw;
    font-size: 4.6875vw;
  }
`;

export const CancelBtn = styled(ConfirmBtn)`
  color: ${(props) => props.theme.colors.grey93};
  background-color: ${(props) => props.theme.colors.greyF1};

  &:hover {
    background-color: ${(props) => props.theme.colors.greyEO};
  }
`;
