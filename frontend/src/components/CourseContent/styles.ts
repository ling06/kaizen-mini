import styled from 'styled-components';
import * as C from '@styles/components';
import forwardIcon from '@assets/images/forwardIcon.svg';

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

export const EditorOutup = styled(C.FlexContainer)`
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
`;
