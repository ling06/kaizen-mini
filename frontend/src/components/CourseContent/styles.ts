import styled from 'styled-components';
import * as C from '@styles/components';
import forwardIcon from '@assets/images/forwardIcon.svg';
import forwardIconDisabled from '@assets/images/forwardIconDisabled.svg';

export const Title = styled(C.Text)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 35px;
  font-size: 31px;
`;

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  position: relative;
`;

export const EditorOutput = styled(C.FlexContainer)`
  flex-direction: column;
  padding-right: 20px;
`;

export const AdminBtnContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const NoOpenLesson = styled(C.Text)`
  font-size: 31px;
`;

export const ForwardBtn = styled(C.DefaultBtn)`
  width: 166px;
  padding: 0 20px 0 28px;
  text-align: start;
  background-image: url(${forwardIcon});
  background-repeat: no-repeat;
  background-position: 87% 50%;
  background-size: 33px;

  &:disabled {
    color: ${(props) => props.theme.colors.grey57};
    background-color: ${(props) => props.theme.colors.grey93};
    background-image: url(${forwardIconDisabled});
  }
`;
