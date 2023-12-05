import styled, { css } from 'styled-components';
import searchIcon from '@assets/images/search-icon.svg';
import * as C from '@/shared/ui/assets/styles/components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
`;

export const Inner = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${(props) => props.theme.utils.zIndex.popup};
  width: 100%;
  min-height: 100%;
  background-color: ${(props) => props.theme.colors.greyF1};
  border-radius: ${(props) => props.theme.utils.br};
  border: 1px solid ${(props) => props.theme.colors.grey93};
  transition: ${(props) => props.theme.utils.transition};

  ${(props) => {
    if (props.$active) {
      return css`
        border-color: ${(props) => props.theme.colors.dark};
        border-width: 2px;
        background-color: transparent;
      `;
    }
  }}
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  height: 62px;
  padding: 20px 30px;
  font-size: 18px;
  font-weight: 400;
  line-height: 120%;
  color: ${(props) => props.theme.colors.grey93};
  border-radius: inherit;
  background-color: transparent;
  border: none;

  &:focus {
    color: ${(props) => props.theme.colors.dark};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.grey93};
  }
`;

export const SearchIcon = styled(C.Icon)`
  position: absolute;
  top: 50%;
  right: 20px;
  background-image: url(${searchIcon});
  transform: translateY(-50%);
`;

export const ResultsList = styled.ul`
  width: 100%;
  padding: 0 30px 10px;
`;

export const ResultItem = styled.li`
  width: 100%;
  padding: 15px 0;
  color: ${(props) => props.theme.colors.dark};
  font-size: 18px;
  font-weight: 400;
  line-height: 120%;
  cursor: pointer;
`;
 
