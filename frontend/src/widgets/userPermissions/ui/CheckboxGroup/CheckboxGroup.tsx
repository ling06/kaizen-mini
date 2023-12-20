import { TPermission } from '@/entities/permissions';
import * as S from './styles';
import { TExtendedUser } from '@/entities/users';
import { UncontrolledCheckBox } from '../UncontrolledCheckBox';
import { PERMISSIONS } from '@/shared/model/constants';
import { css } from 'styled-components';

interface ICheckboxGroupProps {
  groupName?: string;
  permissions: Array<TPermission>;
  userPermissions: TExtendedUser['data']['permissions'];
}

const checkBoxWidth = css`
  min-width: 150px;
`;

export function CheckboxGroup({ groupName, permissions, userPermissions }: Readonly<ICheckboxGroupProps>) {
  return (
    <S.Group>
      {groupName && <S.GroupName>{groupName}</S.GroupName>}
      <S.CheckboxList>
        {permissions.map((permission) => {
          return (
            <UncontrolledCheckBox
              key={permission.code}
              name={permission.code}
              label={PERMISSIONS[`${permission.code.replace('#', '_')}`]}
              checked={!![...userPermissions].find((userPermission) => userPermission.code === permission.code)}
              isLabelBold={false}
              styles={checkBoxWidth}
            />
          );
        })}
      </S.CheckboxList>
    </S.Group>
  );
}
