import { SuggestionInput } from '../suggestion.in';

export interface LocationSuggestionInput extends SuggestionInput {
  latitude: number;
  longitude: number;
}
