import { Permissions } from '../types';

export interface GroupInterface {
  id?: number;
  name: string;
  permissions?: Array<Permissions>;
}
