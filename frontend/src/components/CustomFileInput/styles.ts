import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: fit-content;
`;

export const FileInput = styled.input`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;
