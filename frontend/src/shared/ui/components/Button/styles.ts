import styled, { RuleSet } from "styled-components";
import * as C from '@/shared/ui/assets/styles/components';

export const Button = styled(C.DefaultBtn)<{$styles?: RuleSet<object>}>`
  width: fit-content;

  ${(props) => {
    if (props.$styles) {
      return props.$styles;
    }
  }}
`;
