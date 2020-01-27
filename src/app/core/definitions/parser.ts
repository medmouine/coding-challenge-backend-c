import { Data } from '../entities/data';

export interface Parser {
  parse(source: string): Data[];
}
