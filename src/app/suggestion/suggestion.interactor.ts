import { Interactor } from '../core/definitions/interactor';
import { LocationSuggestionInput } from './location/location.suggestion.in';
import { LocationSuggestionOutput } from './location/location.suggestion.out';
import { LocationSearcher } from './location/location.searcher';

export class SuggestionInteractor implements Interactor {
  constructor(private locationSearcher: LocationSearcher) {}

  execute(locationSuggestionInput: LocationSuggestionInput): LocationSuggestionOutput[] {
    return this.locationSearcher.search(locationSuggestionInput);
  }
}
