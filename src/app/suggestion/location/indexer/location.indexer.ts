import { Indexer } from '../../../core/definitions/indexer';
import { LocationQueryResult } from '../location.query.result';
import { IndexedData } from '../../../core/entities/indexedData';
import { LocationData } from '../location.data';

export interface LocationIndexer extends Indexer {
  getByQuery(query: string): LocationQueryResult[];
  index(data: LocationData[]): IndexedData[];
}
