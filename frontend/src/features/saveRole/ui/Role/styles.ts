import styled from 'styled-components';
import { TextStyles } from '@/shared/ui/assets/styles/base-styles';

export const Role = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px 0;
  border-top: 1px solid ${(props) => props.theme.colors.greyF1};
  cursor: pointer;
  transition: border-color .2s ease-in-out;
  
  &:hover {
    border-color: ${props => props.theme.colors.mainBlue};
    * {
      color: ${props => props.theme.colors.dark};
    }
  }

  &:last-child {
    margin-bottom: 15px;
    border-bottom: 1px solid ${(props) => props.theme.colors.greyF1};
  }
`;

export const RoleName = styled.p`
  ${TextStyles}
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.mainBlue};
  transition: color .2s ease-in-out;
`;

export const RoleDescr = styled.p`
  ${TextStyles}
  font-weight: 400;
  color: ${(props) => props.theme.colors.mainBlue};
  transition: color .2s ease-in-out;
`;
