import { LocationSuggestionInput } from './suggestion/location/location.suggestion.in';
import { SuggestionInteractor } from './suggestion/suggestion.interactor';
import { LocationSuggestionOutput } from './suggestion/location/location.suggestion.out';

export class App {
  constructor(private suggestionInteractor: SuggestionInteractor) {}

  public getSuggestions(suggestionsInput: LocationSuggestionInput): LocationSuggestionOutput[] {
    return this.suggestionInteractor.execute(suggestionsInput);
  }
}
