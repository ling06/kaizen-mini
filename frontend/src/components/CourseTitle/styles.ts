import styled from 'styled-components';

interface ITitle {
  $isDeleted?: boolean;
  $isSelected?: boolean;
  $isHidden?: boolean;
}

export const Title = styled.h3<ITitle>`
  font-size: 24.923px;
  font-weight: ${props => props.$isSelected ? 700 : 500};
  color: ${props => props.$isHidden ? props.theme.colors.grey93 : props.theme.colors.realBlack};
  text-decoration: ${props => props.$isDeleted ? 'line-through' : 'none'};
`;