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
  @media ${(props) => props.theme.media.mobile} {
    padding: 0 3.125vw;
    margin-bottom: 6.25vw;
    font-size:  5.625vw;
  }
`;

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  position: relative;
`;

export const EditorOutput = styled(C.FlexContainer)`
  flex-direction: column;
  padding-right: 20px;
  @media ${(props) => props.theme.media.mobile} {
    padding: 0;
  }
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
  @media ${(props) => props.theme.media.mobile} {
    width: fit-content;
    min-height: 15.625vw;
    padding: 0px 15vw 0px 8vw;
    margin: 0;
    margin-left: auto;
    margin-right: 3.125vw;
    text-align: center;
    background-position: 88% 50%;
    background-size: 10.3125vw;
  }

  &:disabled {
    color: ${(props) => props.theme.colors.grey57};
    background-color: ${(props) => props.theme.colors.grey93};
    background-image: url(${forwardIconDisabled});
  }
`;
