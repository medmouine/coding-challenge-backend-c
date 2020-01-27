import { Ranker } from '../../../core/definitions/ranker';
import { LocationRankingOut } from './location.ranking.out';
import { LocationQueryResult } from '../location.query.result';
import { LocationSuggestionInput } from '../location.suggestion.in';

export interface LocationSubRanker extends Ranker {
  score(input: LocationQueryResult, suggestionInput: LocationSuggestionInput): LocationRankingOut;
  getWeight(): number;
  isApplicable(suggestionInput: LocationSuggestionInput): boolean;
}
