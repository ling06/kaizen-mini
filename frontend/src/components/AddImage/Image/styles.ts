import styled from 'styled-components';

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 342px;
  height: 228px;
  border-radius: 19px;
  background-color: ${(props) => props.theme.colors.greyF1};
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
