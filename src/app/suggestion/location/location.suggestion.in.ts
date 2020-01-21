import { SuggestionInput } from '../suggestion.in';

export interface LocationSuggestionInput extends SuggestionInput {
  latitude: string;
  longitude: string;
}
