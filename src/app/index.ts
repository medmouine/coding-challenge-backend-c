import { LocationSuggestion } from './suggestion/locationSuggestion';
import { LocationSuggestionInput } from './suggestion/location/location.suggestion.in';

export class App {
  constructor(private suggestionInteractor: SuggestionInteractor) {}

  public getSuggestions(suggestionsInput: LocationSuggestionInput): LocationSuggestion[] {
    return this.suggestionInteractor.execute(suggestionsInput);
  }
}
