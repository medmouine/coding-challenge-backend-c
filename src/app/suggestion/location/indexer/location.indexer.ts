import { Indexer } from '../../../core/definitions/indexer';
import { LocationQueryResult } from '../location.query.result';
import { LocationData } from '../location.data';
import { LocationIndexedData } from './location.data.indexed';

export interface LocationIndexer extends Indexer {
  getByQuery(query: string): LocationQueryResult[];
  index(data: LocationData[]): LocationIndexedData;
}
