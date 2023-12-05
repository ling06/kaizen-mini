import styled, { RuleSet } from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';
import searchIcon from '@assets/images/search-icon.svg';

export const Container = styled.div<{ $styles?: RuleSet<object> }>`
  position: relative;
  width: fit-content;
  ${(props) => {
    if (props.$styles) {
      return props.$styles;
    }
  }}
`;

export const SearchInput = styled.input`
  width: 508px;
  height: 64px;
  padding: 20px 30px;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  color: ${(props) => props.theme.colors.grey93};
  background-color: ${(props) => props.theme.colors.greyF1};
  border-radius: ${(props) => props.theme.utils.br};
  border: 1px solid ${(props) => props.theme.colors.grey93};
  transition: ${props => props.theme.utils.transition};

  &:focus {
    color: ${props => props.theme.colors.dark};
    background-color: transparent;
    border-color: ${(props) => props.theme.colors.dark};
  }

  &::placeholder {
    font-weight: 400;
  }
`;

export const SearchIcon = styled(C.Icon)`
  position: absolute;
  top: 50%;
  right: 20px;
  background-image: url(${searchIcon});
  transform: translateY(-50%);
`;
