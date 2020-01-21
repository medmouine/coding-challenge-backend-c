import { Data } from '../entities/data';
import { IndexedData } from '../entities/indexedData';
import { QueryResult } from '../entities/queryResult';

export interface Indexer {
  index(data: Data[]): IndexedData[];
  getByQuery(query: string): QueryResult[];
}
