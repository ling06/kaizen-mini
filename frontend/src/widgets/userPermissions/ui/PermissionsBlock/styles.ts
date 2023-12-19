import styled from 'styled-components';

export const PermissionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 65px;
  }
`;
