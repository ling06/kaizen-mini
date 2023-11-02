import styled from 'styled-components';
import * as C from '@styles/components';
import isHideIcon from '@assets/images/hideIcon.svg';


export const CustomSelectOption = styled.label`
  display: flex;
  align-items: center;
  border: 0;
  padding-bottom: 5px;
  /* padding: 0 20px; */
  /* height: 63px; */
  cursor: pointer;
  &*:first-child {
    padding: 0;
  }
  &*:focus {
    background-color: transparent;
  }
`;

export const TextLabel = styled.p<{ $isSelected: boolean }>`
  margin-right: 30px;
  color: #000;
  font-family: 'Montserrat';
  font-size: 24.923px;
  font-weight: ${(props) => (props.$isSelected ? 700 : 500)};
  line-height: 120%;
  &:first-child {
    font-weight: 700;
  }
`;

export const IsHiddenIcon = styled(C.Icon)`
  background-image: url(${isHideIcon});
`;
