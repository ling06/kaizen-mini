import { css, styled } from 'styled-components';
import checkboxIcon from '@assets/images/checkbox.svg';
import checkboxIconChecked from '@assets/images/checkbox-checked.svg';
import * as C from '@styles/components';

export const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Input = styled.input`
  display: none;
`;

interface ICustomCheckboxProps {
  $checked: boolean;
  $isRadio: boolean;
}

export const CustomCheckbox = styled.div<ICustomCheckboxProps>`
  width: 24px;
  height: 24px;
  margin-right: 15px;
  background-image: url(${(props) => (props.$checked ? checkboxIconChecked : checkboxIcon)});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  ${(props) => {
    if (props.$isRadio) {
      return css`
        position: relative;
        width: 16px;
        height: 16px;
        margin-right: 14px;
        border-radius: 50%;
        position: relative;
        border: 1px solid #333;
        background-image: unset;
      `;
    }
  }}

  &::before {
    content: '';
    display: ${(props) => (props.$checked && props.$isRadio ? 'block' : 'none')};
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #333;
    transform: translate(-50%, -50%);
  }
`;

export const CheckboxDescr = styled(C.Text)<{$bold: boolean}>`
font-weight: ${props => props.$bold ? '700' : '400'};
line-height: 100%`;
