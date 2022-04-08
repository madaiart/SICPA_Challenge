import { Position } from '../models/position';

export interface DataResponsePosition {
  succeeded: boolean;
  message: string;
  errors: string;
  data: Position;
}
