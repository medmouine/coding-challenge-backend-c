import { LocationSuggestionOutput } from '../../../../app/suggestion/location/location.suggestion.out';

export class SuggestionPresenter {
  public present(locationSuggestionOutput: LocationSuggestionOutput[]): Promise<LocationSuggestionOutput[]> {
    return Promise.resolve(locationSuggestionOutput);
  }
}
