import 'styled-components';
import { IBaseTheme } from './shared/types';

declare module 'styled-components' {
  export interface DefaultTheme extends IBaseTheme {}
}
