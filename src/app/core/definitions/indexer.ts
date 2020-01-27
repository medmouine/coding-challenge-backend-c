import { Data } from '../entities/data';
import { QueryResult } from '../entities/queryResult';
import { IndexedData } from '../entities/indexedData';

export interface Indexer {
  index(data: Data[]): IndexedData;
  getByQuery(query: string): QueryResult[];
}
