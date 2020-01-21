import { Input } from './input';
import { Output } from './output';

export interface Searcher {
  search(input: Input): Output[];
}
