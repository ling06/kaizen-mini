import styled from 'styled-components';

export const HighLightText = styled.span<{ $color?: string }>`
  background-color: ${(props) => (props.$color ? props.$color : props.theme.colors.mainYellow)};
`;
