import { ILayout } from '@/shared/model/types';
import * as S from './styles';
import { RuleSet } from 'styled-components';
import { ReactElement } from 'react';

interface ILayoutProps extends ILayout {
  styles?: RuleSet<object>;
}

/**
 * Renders the layout component.
 *
 * @param {ILayoutProps} children - The children to be rendered inside the layout.
 * @param {styles} styles - The styles to be applied to the layout.
 * @return {ReactElement} The rendered layout component.
 */
export function Layout({ children, styles }: ILayoutProps): ReactElement {
  return <S.Layout $styles={styles}>{children}</S.Layout>;
}
