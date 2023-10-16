import styled from 'styled-components';
import * as C from '@styles/components';
import { TextStyles } from '@/styles/base-styles';

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

export const OrderedList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  list-style: decimal inside;
`;

export const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  list-style: disc inside;
`;

export const ListItem = styled.li`
  display: list-item;
  ${TextStyles}
  font-weight: 400;
`;


export const NoOpenLesson = styled(C.Text)`
  font-size: 31px;
`;
