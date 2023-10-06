import * as C from '@styles/components';
import styled from 'styled-components';

export const Container = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 66px;
`;

export const Wrapper = styled(C.FlexContainer)`
  flex-direction: column;
  width: 49.7%;
  height: 400px;
  padding: 20px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.realWhite};
`;

export const ImgWrapper = styled(Wrapper)`
  padding: 0;
  overflow: hidden;
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
`;

export const OpenCourse = styled(C.DefaultBtn)`
  width: fit-content;
  padding: 0 40px;
  border-radius: 22px;
`;
