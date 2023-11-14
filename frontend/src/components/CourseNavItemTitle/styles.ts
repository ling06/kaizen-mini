import styled from 'styled-components';

interface ITitle {
  $active?: boolean;
  $isDeleted?: boolean;
}

export const Title = styled.p<ITitle>`
  font-size: 15px;
  font-weight: 500;
  line-height: 170%;
  color: ${(props) => (props.$active ? props.theme.colors.dark : props.theme.colors.grey93)};
  text-decoration: ${props => props.$isDeleted ? 'line-through' : 'none'};
  @media ${(props) => props.theme.media.mobile} {
    font-size: 3.75vw;
  }
`;
