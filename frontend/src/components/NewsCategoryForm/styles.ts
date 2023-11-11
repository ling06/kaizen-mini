import styled from 'styled-components';
import * as C from '@styles/components';
import addIcon from '@assets/images/addIconWhite.svg';

export const CategoriesList = styled(C.FlexContainer)`
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 20px;
`;

export const AddCategoryBtn = styled(C.DefaultBtn)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0 20px;
`;

export const AddCategoryIcon = styled(C.Icon)`
  margin-right: 10px;
  background-image: url(${addIcon});
`;