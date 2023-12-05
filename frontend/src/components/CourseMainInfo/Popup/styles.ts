import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import addIcon from '@assets/images/addIcon.svg';

export const Overlay = styled.div`
  display: flex;
  align-items: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${(props) => props.theme.utils.zIndex.darkOverlay};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 4.0625vw;
  background-color: ${(props) => props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br} ${(props) => props.theme.utils.br} 0px 0px;
`;

export const CoursesList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 4.6875vw;
  margin-bottom: 3.75vw;
`;

export const Course = styled.li`
  &:not(:last-child) {
    margin-bottom: 6.25vw;
  }
`;

export const AddCourseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 4.6875vw;
  margin: 0;
  margin-bottom: 2%;
  background-color: transparent;
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;

export const AddCourseBtnTitle = styled(C.Text)`
  width: 90%;
  font-size: 4.6875vw;
  font-weight: 600;
  text-align: start;
`;

export const AddCourseBtnIcon = styled(C.Icon)`
  background-image: url(${addIcon});
`;

export const CloseBtnWrapper = styled.div`
  padding: 3.125vw 4.6875vw;
  border-top: 1px solid ${(props) => props.theme.colors.greyF1};
`;

export const CloseBtn = styled(C.DefaultBtn)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 15.625vw;
  color: ${(props) => props.theme.colors.grey93};
  background-color: ${(props) => props.theme.colors.greyF1};
`;
