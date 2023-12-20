import { useMemo } from 'react';
import { UncontrolledCheckBox } from '../UncontrolledCheckBox';
import * as S from './styles';
import { TPermission } from '@/entities/permissions';
import { CheckboxGroup } from '../CheckboxGroup';
import { PERMISSIONS } from '@/shared/model/constants';
import { css } from 'styled-components';

export interface IPermissionsBlockProps {
  permissions: Array<TPermission>;
  userPermissions: Array<TPermission>;
}

const checkBoxMargin = css`
  margin-bottom: 25px;
`;

export function PermissionsBlock({ permissions, userPermissions }: IPermissionsBlockProps) {
  console.log(userPermissions);
  
  const divided = useMemo(() => {
    const index = permissions.findIndex((permission) => !permission.code.includes('#'));
    if (index !== -1) {
      return {
        main: permissions[index],
        others: permissions.filter((_, i) => i !== index),
      };
    }
  }, [permissions]);

  if (!divided) return null;

  const news = divided.others.filter((permission) => permission.code.includes('#news'));
  const courses = divided.others.filter((permission) => permission.code.includes('#course'));
  const knowledge = divided.others.filter((permission) => permission.code.includes('#knowledge'));

  return (
    <S.PermissionsBlock>
      <UncontrolledCheckBox
        label={PERMISSIONS[`${divided.main.code.replace('#', '_')}`]}
        name={divided.main.code}
        checked={!!userPermissions.find((permission) => permission.code === divided.main.code)}
        styles={checkBoxMargin}
      />
      <CheckboxGroup
        groupName={'Новости'}
        permissions={news}
        userPermissions={userPermissions}
      />
      <CheckboxGroup
        groupName={'Курсы'}
        permissions={courses}
        userPermissions={userPermissions}
      />
      <CheckboxGroup
        groupName={'База знаний'}
        permissions={knowledge}
        userPermissions={userPermissions}
      />
    </S.PermissionsBlock>
  );
}
