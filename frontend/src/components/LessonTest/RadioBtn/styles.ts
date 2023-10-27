import { TextStyles } from '@/styles/base-styles';
import styled from 'styled-components';
import radio from '@assets/images/radio.svg';
import radioChecked from '@assets/images/radio-checked.svg';

export const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${TextStyles}
  font-weight: 400;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const RadioBtn = styled.input`
  appearance: none;
  width: 36px;
  height: 36px;
  margin-right: 25px;
  background-image: url(${radio});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &:checked {
    background-image: url(${radioChecked});
  }
`;
