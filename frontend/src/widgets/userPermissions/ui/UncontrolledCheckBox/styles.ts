import { RuleSet, styled } from 'styled-components';
import checkboxIcon from '@assets/images/checkbox.svg';
import checkboxIconChecked from '@assets/images/checkbox-checked.svg';
import { TextStyles } from '@/shared/ui/assets/styles/base-styles';

export const Label = styled.label<{$styles?: RuleSet<object>}>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${props => {
    if (props.$styles) {
      return props.$styles;
    }
  }}
`;

export const Input = styled.input`
  display: none;
`;

interface ICustomCheckboxProps {
  $checked: boolean;
}

export const CustomCheckbox = styled.div<ICustomCheckboxProps>`
  width: 24px;
  height: 24px;
  margin-right: 15px;
  background-image: url(${(props) => (props.$checked ? checkboxIconChecked : checkboxIcon)});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`;

export const CheckboxDescr = styled.p<{ $bold: boolean }>`
  ${TextStyles}
  font-weight: ${(props) => (props.$bold ? '700' : '400')};
  line-height: 100%;
`;
