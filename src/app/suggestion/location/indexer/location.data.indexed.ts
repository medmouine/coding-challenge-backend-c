import { IndexedData } from '../../../core/entities/indexedData';
import { LocationData } from '../location.data';

export interface LocationIndexedData extends IndexedData {
  [index: string]: LocationData[];
}
