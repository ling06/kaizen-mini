import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

export const ProgressContainer = styled(C.FlexContainer)`
  flex-direction: column;
  margin-top: auto;
`;

export const ProgressStatusWrapper = styled(C.FlexContainer)`
  align-items: flex-end;
  margin-bottom: 10px;
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 1.875vw;
  }
`;

export const ProgressStatus = styled.p`
  margin-right: auto;
  font-size: 15px;
  font-weight: 500;
  line-height: 160%;
  color: ${(props) => props.theme.colors.realBlack};
  @media ${(props) => props.theme.media.mobile} {
    font-size: 2.5vw;
  }
`;

export const BtnsGroup = styled(C.FlexContainer)`
  flex-direction: column;
  width: fit-content;
`;
