import { EButtonType } from '../enum/EButtonTypes';
import { IICon } from './IIcon';

export interface IButton {
  text: string;
  type: EButtonType;
  icon?: IICon;
}
