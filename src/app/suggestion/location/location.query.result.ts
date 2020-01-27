import { QueryResult } from '../../core/entities/queryResult';

export interface LocationQueryResult extends QueryResult {
  latitude: number;
  longitude: number;
}
