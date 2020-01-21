import { QueryResult } from '../../core/entities/queryResult';

export interface LocationQueryResult extends QueryResult {
  name: string;
  latitude: number;
  longitude: number;
}
