import { TPermissions } from '@/entities/permissions';
import * as S from './styles';
import { TExtendedUser } from '@/entities/users';
import { useMemo } from 'react';
import { UncontrolledCheckBox } from '../UncontrolledCheckBox';
import { PERMISSIONS } from '@/shared/model/constants';
import { CheckboxGroup } from '../CheckboxGroup';
import { css } from 'styled-components';
interface IViewBlockProps {
  viewPermissions: TPermissions['data']['view'];
  userViewPermissions: TExtendedUser['data']['permissions'];
}

const checkBoxMargin = css`
  margin-bottom: 25px;
`;

export function ViewBlock({ viewPermissions, userViewPermissions }: IViewBlockProps) {
  const sorted = useMemo(() => {
    const index = viewPermissions.findIndex((permission) => !permission.code.includes('#'));
    if (index !== -1) {
      return {
        main: viewPermissions[index],
        others: viewPermissions.filter((_, i) => i !== index),
      };
    }
  }, [viewPermissions]);

  return (
    <S.Container>
      {sorted && (
        <>
          <UncontrolledCheckBox
            name={sorted.main.code}
            label={PERMISSIONS[`${sorted.main.code.replace('#', '_')}`]}
            checked={
              !!userViewPermissions.find((permission) => permission.code === sorted.main.code)
            }
            styles={checkBoxMargin}
          />
          <CheckboxGroup
            groupName={''}
            permissions={sorted?.others}
            userPermissions={userViewPermissions}
          />
        </>
      )}
      <S.Divider />
    </S.Container>
  );
}
