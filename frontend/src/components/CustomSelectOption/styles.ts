import styled from 'styled-components';
import * as C from '@styles/components';
import isHideIcon from '@assets/images/hideIcon.svg';

export const CustomSelectOption = styled.label`
  display: flex;
  align-items: center;
  border: 0;
  padding-bottom: 5px;
  cursor: pointer;
  @media ${(props) => props.theme.media.mobile} {
    padding-bottom: 0;
  }
  &*:first-child {
    padding: 0;
  }
  &*:focus {
    background-color: transparent;
  }
`;

export const TextLabel = styled.p<{ $isSelected: boolean; $isDeleted: boolean }>`
  margin-right: 30px;
  color: #000;
  font-family: 'Montserrat';
  font-size: 24.923px;
  font-weight: ${(props) => (props.$isSelected ? 700 : 500)};
  line-height: 120%;
  &:first-child {
    font-weight: 700;
    @media ${(props) => props.theme.media.mobile} {
      font-weight: 500;
    }
  }
  text-decoration: ${(props) => (props.$isDeleted ? 'line-through' : 'none')};
  @media ${(props) => props.theme.media.mobile} {
    margin-right: 2%;
    font-size: 4.6875vw;
    font-weight: 500;
  }
`;

export const IsHiddenIcon = styled(C.Icon)`
  margin-left: auto;
  margin-right: 20px;
  background-image: url(${isHideIcon});
  @media ${(props) => props.theme.media.mobile} {
    margin-right: 0;
  }
`;
