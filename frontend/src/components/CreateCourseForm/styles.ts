import styled from 'styled-components';
import * as C from '@styles/components';
import imagesIcon from '@assets/images/imagesIcon.svg';

// export const Container = styled(C.FlexContainer)`
//   flex-direction: column;
//   padding-top: 25px;
// `;

// export const Form = styled.form`
//   height: 90vh;
//   padding: 0 25px 5vh;
//   overflow-y: auto;
// `;

export const NameInput = styled(C.InputWithState)`
  margin-bottom: 20px;
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 2.5vw;
  }
`;

export const Textarea = styled(C.InputWithState)`
  min-height: 557px;
  margin-bottom: 15px;
  resize: none;
  outline: none;
  @media ${(props) => props.theme.media.mobile} {
    min-height: 93.125vw;
    margin-bottom: 2.5vw;
  }
`;

export const AddCourseImg = styled(C.DefaultBtn)`
  width: fit-content;
  min-height: 41px;
  padding: 0 24px 0 52px;
  margin-bottom: 20px;
  font-size: 15.397px;
  background-image: url(${imagesIcon});
  background-repeat: no-repeat;
  background-position: 17px 9px;
  background-size: 24px;
  @media ${(props) => props.theme.media.mobile} {
    min-height: 12.5vw;
    padding: 0  7.5vw 0 16.25vw;
    margin-bottom: 4.6875vw;
    font-size: 4.6875vw;
    background-size: 7.5vw;
    background-position: 5.3125vw center;
  }
`;

export const BottomContainer = styled(C.FlexContainer)`
  justify-content: space-between;
`;
