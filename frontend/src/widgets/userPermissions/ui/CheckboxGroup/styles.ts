import styled from 'styled-components';

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
`;

export const GroupName = styled.h3`
  margin-bottom: 2px;
  font-size: 10px;
  font-weight: 700;
  line-height: 120%;
  color: ${(props) => props.theme.colors.grey93};
`;

export const CheckboxList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 50px;
`;
