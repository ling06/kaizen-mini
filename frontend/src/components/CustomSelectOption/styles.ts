import styled from "styled-components";
import * as C from '@styles/components';
import isHideIcon from '@assets/images/hideIcon.svg';

export const CustomSelectOpions = styled.label`
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 570px;
  height: 63px;
  &*:first-child {
    padding: 0;
  }
  &*:focus{
    background-color: transparent;
  }
  
`;

export const TextLabel = styled.p`
  max-width: 365px;

  margin-right: auto;
  color: #000;
  font-family: "Montserrat";
  font-size: 24.923px;
  font-weight: 500;
  line-height: 120%;
  &:first-child {
    font-weight: 700;
  }
`;

export const IsHiddenIcon = styled(C.Icon)`
  background-image: url(${isHideIcon});
`;
