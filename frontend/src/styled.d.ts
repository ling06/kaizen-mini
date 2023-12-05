import 'styled-components';
import { IBaseTheme } from './shared/model/types';

declare module 'styled-components' {
  export interface DefaultTheme extends IBaseTheme {}
}
