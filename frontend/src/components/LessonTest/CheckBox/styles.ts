import styled from 'styled-components';

// Styled component for the checkbox wrapper
export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// Styled component for the checkbox input
export const CheckboxInput = styled.input`
  appearance: none;
  width: 15px;
  height: 15px;
  border: 2px solid #555;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;

  &:checked {
    background-color: #555;
  }
`;

// Styled component for the checkbox label
export const CheckboxLabel = styled.label`
  cursor: pointer;
`;




