import * as C from '@/shared/ui/assets/styles/components';
import styled from 'styled-components';

export const Container = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 66px;
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 7.8125vw;
  }
`;

export const Wrapper = styled(C.FlexContainer)`
  flex-direction: column;
  position: relative;
  width: 49.7%;
  height: 400px;
  padding: 20px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.realWhite};
  @media ${(props) => props.theme.media.mobile} {
    width: 100%;
    height: auto;
    padding: 0.94vw 4.69vw 4.69vw;
  }
`;

export const ImgWrapper = styled(Wrapper)`
  padding: 0;
  overflow: hidden;
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;

export const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ActualStep = styled.p`
  display: flex;
  align-items: center;
  height: fit-content;
  margin-bottom: 33px;
  font-size: 15px;
  font-weight: 500;
  line-height: 130%;
  color: ${(props) => props.theme.colors.realBlack};
`;

export const ArrowRight = styled.img`
  display: inline-block;
  width: 24px;
  margin: 0 5px;
`;

export const LessonName = styled(C.Text)`
  max-width: 95%;
  font-size: 25px;
  line-height: 130%;
  @media ${(props) => props.theme.media.mobile} {
    max-width: 100%;
    margin-bottom: 12.5vw;
    font-size: 4.6875vw;
  }
`;

export const OpenCourse = styled(C.DefaultBtn)`
  width: fit-content;
  padding: 0 40px;
  margin-top: auto;
  border-radius: 22px;
  @media ${(props) => props.theme.media.mobile} {
    min-height: 12.5vw;
    padding: 0 7.5vw;
    font-size: 4.6875vw;
    border-radius: 7px;
  }
`;

export const CourseName = styled(LessonName)`
  margin-bottom: 12px;
`;

export const CompleteStatus = styled(C.Text)`
  font-size: 22.689px;
  color: ${(props) => props.theme.colors.mainBlue};
`;

export const ErrorName = styled(LessonName)`
  margin: auto;
`;
