import styled from 'styled-components';

interface IContainer {
  $isDeleted: boolean;
}

export const Container = styled.div<IContainer>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 30px;
  cursor: pointer;
  opacity: ${(props) => (props.$isDeleted ? 0.5 : 1)};
  text-decoration: ${(props) => (props.$isDeleted ? 'line-through' : 'none')};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

