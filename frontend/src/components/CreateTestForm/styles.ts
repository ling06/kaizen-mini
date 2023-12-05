import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import addIcon from '@assets/images/addIconWhite.svg';
import deleteIcon from '@assets/images/deleteIcon.svg';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  padding-top: 40px;
  margin-bottom: 30px;
`;

export const TestName = styled(C.InputWithState)`
  margin-bottom: 30px;
`;

export const Variants = styled(C.FlexContainer)`
  flex-direction: column;
`;

export const AddVariant = styled(C.DefaultBtn)`
  width: fit-content;
  padding: 0 20px 0 50px;
  margin-bottom: 45px;
  background-image: url(${addIcon});
  background-repeat: no-repeat;
  background-position: 23px 50%;
  background-size: 24px;
`;

export const DeleteTestBtn = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0;
  margin: 0 0 45px;
  color: ${(props) => props.theme.colors.yRed};
  background-color: transparent;
`;

export const DeleteTestBtnIcon = styled(C.Icon)`
  margin-right: 5px;
  background-image: url(${deleteIcon});
`;
