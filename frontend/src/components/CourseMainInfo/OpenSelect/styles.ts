import styled from 'styled-components';
import * as C from '@styles/components';
import selectIcon from '@assets/images/accordionIcon.svg';
import isHideIcon from '@assets/images/hideIcon.svg';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 4.6875vw;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 75%;
`;

export const CourseTitle = styled(C.Text)<{ $isDeleted: boolean }>`
  /* width: 90%; */
  margin-right: 1.875vw;
  font-size: 4.6875vw;
  text-decoration: ${props => props.$isDeleted ? 'line-through' : 'none'};
`;

export const SelectIcon = styled(C.Icon)`
  background-image: url(${selectIcon});
  @media ${(props) => props.theme.media.mobile} {
    min-width: 7.5vw;
    min-height: 7.5vw;
  }
`;

export const IsHiddenIcon = styled(C.Icon)`
  margin-left: auto;
  margin-right: 2%;
  background-image: url(${isHideIcon});
`;
