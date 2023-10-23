import styled from 'styled-components';
import * as C from '@styles/components';
import addIcon from '@assets/images/addIconWhite.svg';

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
  background-image: url(${addIcon});
  background-repeat: no-repeat;
  background-position: 23px 50%;
  background-size: 24px;
`;
