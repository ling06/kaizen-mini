import styled from 'styled-components';
import dndIcon from '@assets/images/dnd-btn.svg';

export const DndBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 5px;
  background-color: transparent;
  cursor: grab;
  background-image: url(${dndIcon});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;

  &:active {
    cursor: grabbing;
  }
`;
