import { Data } from '../../core/entities/data';
import { ID } from '../../core/definitions/id';

export interface LocationData extends Data {
  id: ID;
  name: string;
  ascii: string;
  alt_name: string;
  lat: number;
  long: number;
  country: string;
  tz: string;
}
