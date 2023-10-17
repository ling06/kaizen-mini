import styled from 'styled-components';

export const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const RadioInput = styled.input`
  display: none;

  &:checked + div::before {
    display: block;
  }
`;

export const CustomRadioInput = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 14px;
  border-radius: 50%;
  position: relative;
  border: 1px solid #333;

  &::before {
    content: '';
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #333;
    transform: translate(-50%, -50%);
  }
`;
