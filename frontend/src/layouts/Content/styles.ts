import styled from 'styled-components';

interface IContentProps {
  $isDeleted?: boolean;
  $isVisible?: boolean;
}

export const Content = styled.div<IContentProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 75%;
  min-height: 200px;
  padding: 15px;
  border-radius: ${(props) => props.theme.utils.br};
  opacity: ${(props) => (props.$isVisible ? 1 : 0.5)};
  background-color: ${(props) => (props.$isDeleted ? 'rgba(224, 54, 56, .1)' : props.theme.colors.realWhite)};
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;
