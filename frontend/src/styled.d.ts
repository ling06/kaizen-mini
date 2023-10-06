import 'styled-components';
import { IBaseTheme } from './types';

declare module 'styled-components' {
  export interface DefaultTheme extends IBaseTheme {}
}
