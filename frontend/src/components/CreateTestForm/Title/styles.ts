import styled from 'styled-components';

export const Title = styled.h5`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  line-height: 120%;
  color: ${(props) => props.theme.colors.grey57};
`;
