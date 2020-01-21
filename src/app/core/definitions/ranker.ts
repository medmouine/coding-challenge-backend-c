import { QueryResult } from '../entities/queryResult';
import { RankingOutput } from './ranking.output';
import { SuggestionInput } from '../../suggestion/suggestion.in';

export interface Ranker {
  score(input: QueryResult, suggestionInput: SuggestionInput): RankingOutput;
}
