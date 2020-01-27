import { Parser } from '../../core/definitions/parser';
import { LocationData } from '../../suggestion/location/location.data';

export interface LocationParser extends Parser {
  parse(source: string): LocationData[];
}
