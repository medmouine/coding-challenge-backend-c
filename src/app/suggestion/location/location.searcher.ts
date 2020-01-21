import { LocationSuggestionInput } from './location.suggestion.in';
import { LocationSuggestionOutput } from './location.suggestion.out';
import { Searcher } from '../../core/definitions/searcher';

export interface LocationSearcher extends Searcher {
  search(locationSuggestionInput: LocationSuggestionInput): LocationSuggestionOutput[];
}
